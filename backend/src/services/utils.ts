// import axios, { AxiosError, AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import logger from "dts-node-logger";
// import type { Document, FilterQuery, Model } from "mongoose";

// import { DataSourceRequestProps, DeleteWithRollbackParams, PaginatedData } from "../types";
// import { BadRequestError, ErrorTypes } from "@dts-tools/aviator-types";

export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

export function slicePercentage<T>(array: T[], startPercent: number, endPercent: number): T[] {
  if (startPercent < 0 || endPercent > 100 || startPercent > endPercent) {
    throw new Error("Invalid percentage range");
  }

  const length = array.length;

  const start = Math.floor((startPercent / 100) * length);
  const end = Math.floor((endPercent / 100) * length);

  return array.slice(start, end);
}

export const batchRequests = async <T>(requests: Array<() => Promise<T>>, batchSize: number = 10): Promise<T[]> => {
  if (batchSize <= 0) {
    throw new Error("batchSize must be greater than 0");
  }

  const results: T[] = [];

  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);

    const batchResults = await Promise.all(batch.map((request) => request()));

    results.push(...batchResults);
  }

  return results;
};

const buildFieldExpr = (path: string) => {
  return path.split(".").reduce<any>(
    (acc, part) => ({
      $getField: {
        field: part,
        input: acc
      }
    }),
    "$$ROOT"
  );
};

export const buildOperatorExpr = (fieldExpr: any, op: string, value: any) => {
  switch (op) {
    case "$gt":
      return { $gt: [fieldExpr, value] };
    case "$gte":
      return { $gte: [fieldExpr, value] };
    case "$lt":
      return { $lt: [fieldExpr, value] };
    case "$lte":
      return { $lte: [fieldExpr, value] };
    case "$ne":
      return { $ne: [fieldExpr, value] };
    case "$in":
      return { $in: [fieldExpr, value] };
    case "$nin":
      return { $nin: [fieldExpr, value] };
    case "$eq":
      return { $eq: [fieldExpr, value] };
    default:
      return { $eq: [fieldExpr, value] };
  }
};

export const getModelData = async <T>(
  Model: Model<T>,
  {
    limit,
    page,
    filter = {},
    select,
    sort = { id: 1 } as Partial<Record<keyof T & string, 1 | -1>>,
    custom,
    paginated = false,
    counted = false,
    map,
    aggregatePipeline,
    computedFields
  }: DataSourceRequestProps<T> & { aggregatePipeline?: any[] }
) => {
  if (counted) {
    if (aggregatePipeline?.length) {
      const countResult = await Model.aggregate([...aggregatePipeline, { $count: "total" }]);
      return countResult[0]?.total ?? 0;
    }

    return await Model.countDocuments(filter).lean();
  }
  if (aggregatePipeline?.length) {
    const pipeline = [...aggregatePipeline];

    const rawFilter: Record<string, any> = {};
    const exprFilters: any[] = [];

    const computed = new Set(computedFields || []);

    Object.entries(filter || {}).forEach(([key, value]) => {
      const isNested = key.includes(".");
      const isComputed = computed.has(key) || [...computed].some((f) => key.startsWith(f + "."));

      // ✅ RAW FIELD → normal $match
      if (!isNested && !isComputed) {
        rawFilter[key] = value;
        return;
      }

      // ✅ COMPUTED / NESTED → $expr
      const fieldExpr = buildFieldExpr(key);

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([op, val]) => {
          exprFilters.push(buildOperatorExpr(fieldExpr, op, val));
        });
      } else {
        exprFilters.push({ $eq: [fieldExpr, value] });
      }
    });

    // ✅ APPLY RAW FILTER FIRST
    if (Object.keys(rawFilter).length > 0) {
      pipeline.unshift({ $match: rawFilter });
    }

    // ✅ APPLY COMPUTED FILTER AFTER
    if (exprFilters.length > 0) {
      pipeline.push({
        $match: {
          $expr: { $and: exprFilters }
        }
      });
    }

    // ✅ SORT
    if (sort) {
      pipeline.push({ $sort: sort as Record<string, 1 | -1> });
    }

    // ✅ PROJECT
    if (select?.length) {
      const project: Record<string, 1> = Object.fromEntries(select.map((field) => [field, 1]));
      project._id = 1;
      pipeline.push({ $project: project });
    }

    // ✅ PAGINATE
    if (paginated && limit && page) {
      pipeline.push({ $skip: (Number(page) - 1) * Number(limit) }, { $limit: Number(limit) });
    }

    const data = await Model.aggregate(pipeline);

    if (!paginated) return map ? map(data) : data;

    // ✅ COUNT PIPELINE
    const countPipeline = [...aggregatePipeline];

    if (Object.keys(rawFilter).length > 0) {
      countPipeline.unshift({ $match: rawFilter });
    }

    if (exprFilters.length > 0) {
      countPipeline.push({
        $match: {
          $expr: { $and: exprFilters }
        }
      });
    }

    const totalResult = await Model.aggregate([...countPipeline, { $count: "total" }]);

    return paginateArray({
      data: map ? map(data) : data,
      limit,
      page,
      total: totalResult[0]?.total ?? 0,
      filter,
      custom,
      select
    });
  }

  let result;
  if (paginated) {
    result = await getPaginatedData(Model, {
      limit,
      page,
      filter,
      select,
      sort,
      custom
    });
    if (map) result.data = map(result.data);
  } else {
    const query = Model.find(filter);
    if (select) query.select(select.join(" "));
    if (sort) query.sort(sort as Record<string, 1 | -1>);
    result = await query.lean();
    if (map) result = map(result);
  }

  return result;
};

export const getPaginatedData = async <TDoc>(
  Model: Model<TDoc>,
  { limit, page, sort, filter = {}, select, custom }: DataSourceRequestProps<TDoc>
): Promise<PaginatedData<TDoc>> => {
  // Build query
  let query = Model.find(filter);
  if (select) query.select(select.join(" "));
  if (sort) query.sort(sort as Record<string, 1 | -1>);

  // Get total document count
  const total = await Model.countDocuments(filter);

  // Apply pagination
  if (limit && page) {
    query = query.limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
  }

  const data = (await query.lean()) as TDoc[];
  return paginateArray({
    data,
    limit,
    page,
    select,
    total,
    filter,
    custom,
    sort
  });
};

export const paginateArray = <T>({
  data,
  limit,
  page,
  total,
  filter = {},
  custom,
  select
}: DataSourceRequestProps<T> & {
  data: T[];
  total: number;
}): PaginatedData<T> => {
  const totalPages = limit ? Math.ceil(total / limit) : 1;

  return {
    data,
    meta: {
      total,
      limit: limit ? Number(limit) : null,
      currentPage: Number(page) || 1,
      totalPages,
      nextPage: page && Number(page) < totalPages ? Number(page) + 1 : null,
      previousPage: page && Number(page) > 1 ? Number(page) - 1 : null,
      date: new Date().toISOString(),
      custom,
      select,
      appliedFilters: Object.keys(filter).reduce((acc, key) => {
        acc[key] = filter[key];
        return acc;
      }, {})
    }
  };
};

export const formatError = (error: { name?: string; statusCode?: number; message?: string }) => {
  return {
    name: error.name || "InternalServerError",
    statusCode: error.statusCode || 500,
    message: error.message || "An unknown error occurred"
  };
};

export const throwError = ({ type, message, error }: { type: string; message: string; error: any }): void => {
  const errorData = {
    type: type || error?.name || "InternalServerError",
    message: message || error?.message || "An unknown error occurred"
  };

  // Log the determined error information
  logger.error(`
    | ErrorType: ${errorData.type}
    | Message: ${errorData.message}
  `);

  let ErrorType = ErrorTypes[errorData.type];

  if (typeof ErrorType !== "function") {
    ErrorType = ErrorTypes.InternalServerError;

    if (typeof ErrorType !== "function") {
      throw new Error(errorData.message || "A severe internal error occurred, and the fallback error type is missing.");
    }
  }

  throw new ErrorType(errorData.message);
};

export const checkParameters = (parameters: Record<string, any>, availableParameters?: Record<string, string[]>) => {
  const missingParameters: string[] = [];
  const wrongValueParameters: string[] = [];

  for (const key in parameters) {
    if (parameters[key] === undefined || parameters[key] === "undefined") {
      missingParameters.push(key);
    }
    // Check if availableParameters exists for this key and if the parameter's value is NOT included in the allowed list
    if (availableParameters?.[key] && !availableParameters[key].includes(parameters[key])) {
      // Store the key for parameters with wrong values
      wrongValueParameters.push(key);
    }
  }

  if (missingParameters.length !== 0) {
    throw new Error(`Parameter(s) missing: ${missingParameters.join(", ")}`);
  }

  if (wrongValueParameters.length !== 0) {
    // Generate a more detailed error message for wrong values
    const wrongValueDetails = wrongValueParameters.map((key) => {
      // Get the allowed values for this parameter
      const allowedValues = availableParameters[key];
      // Format the allowed values for the message
      const allowedValuesString = allowedValues ? `(allowed: [${allowedValues.join(", ")}])` : "";

      // Return a string combining the parameter key and its allowed values
      return `${key} ${allowedValuesString}`;
    });

    throw new Error(`Wrong value for parameter(s): ${wrongValueDetails.join(", ")}`);
  }
};

export const wait = async (ms = 0) => {
  // logger.debug("I will wait: ", ms, " ms")
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const setModelData = async <T extends { id: string | number }>(Model: Model<T>, data: T[]) => {
  if (!Array.isArray(data)) {
    throw new BadRequestError("Input must be an array of finding data.");
  }

  const results: T[] = [];
  const errors: { id?: string | number; error: string; data?: unknown }[] = [];

  for (const dataEntry of data) {
    // Validate that each item has an id
    if (!dataEntry || !dataEntry.id) {
      errors.push({ data: dataEntry, error: "Missing or invalid ID" });
      continue;
    }

    try {
      const entry = await Model.findOneAndUpdate(
        { id: dataEntry.id },
        { $set: dataEntry },
        {
          upsert: true,
          new: true,
          runValidators: true
        }
      );

      results.push(entry);
    } catch (error: any) {
      errors.push({ id: dataEntry.id, error: error.message });
    }
  }

  if (errors.length > 0) {
    console.log(errors[0]);
    console.warn(`Finished processing ${Model.modelName} with ${errors.length} errors.`);
  }
  return results;
};
