import { Community as CommunityModel } from "@/models/community.model.js";
import { Types } from "mongoose";
import { COMMUNITY_CATEGORIES } from "@/config/community_categories.js";

export const getPaginatedCommunityRails = async (query: Record<string, string> = {}) => {
  const rowLimit = parseInt(query.rowLimit, 10) || 3;
  const cardLimit = parseInt(query.cardLimit, 10) || 4;
  const rowCursor = query.rowCursor || null; // Should be category name
  const horizontalCategory = query.category || null;
  const cardCursor = query.cardCursor || null; // Expected to be a string/ObjectId of the community

  // - HORIZONTAL RAIL -
  if (horizontalCategory) {
    const matchQuery: any = { categories: horizontalCategory };

    // If a cursor is passed, only fetch items after this specific ID to maintain insertion order pagination
    if (cardCursor && Types.ObjectId.isValid(cardCursor)) {
      matchQuery._id = { $gt: new Types.ObjectId(cardCursor) };
    }

    const items = await CommunityModel.find(matchQuery)
      .sort({ _id: 1 }) // Crucial for reliable cursor pagination
      .limit(cardLimit + 1); // Fetch 1 extra item to check if there is a next page

    const hasNextCardPage = items.length > cardLimit;
    const slicedItems = hasNextCardPage ? items.slice(0, cardLimit) : items;
    const nextCardCursor =
      hasNextCardPage && slicedItems.length > 0
        ? (slicedItems[slicedItems.length - 1]._id as Types.ObjectId).toString()
        : null;

    return {
      data: slicedItems,
      pagination: {
        nextCardCursor,
        hasNextCardPage
      }
    };
  }

  // - VERTICAL RAIL -

  // 1. Grab all distinct categories across the collection
  const uniqueCategories: string[] = await CommunityModel.distinct("categories");

  let startRowIndex = 0;
  if (rowCursor) {
    const foundIndex = uniqueCategories.indexOf(rowCursor);
    if (foundIndex !== -1) startRowIndex = foundIndex + 1;
  }

  const paginatedCategories = uniqueCategories.slice(startRowIndex, startRowIndex + rowLimit);

  const sections = await Promise.all(
    paginatedCategories.map(async (categoryName) => {
      const items = await CommunityModel.find({ categories: categoryName })
        .sort({ _id: 1 })
        .limit(cardLimit + 1);

      const hasNextCardPage = items.length > cardLimit;
      const slicedItems = hasNextCardPage ? items.slice(0, cardLimit) : items;
      const nextCardCursor =
        hasNextCardPage && slicedItems.length > 0
          ? (slicedItems[slicedItems.length - 1]._id as Types.ObjectId).toString()
          : null;

      return {
        category: categoryName,
        items: slicedItems,
        horizontalPagination: {
          nextCardCursor,
          hasNextCardPage
        }
      };
    })
  );

  const hasNextRowPage = startRowIndex + rowLimit < uniqueCategories.length;

  return {
    sections,
    verticalPagination: {
      nextRowCursor: hasNextRowPage ? paginatedCategories[paginatedCategories.length - 1] : null,
      hasNextRowPage
    }
  };
};

export const getCommunityCategories = async () => {
  return COMMUNITY_CATEGORIES;
};

export const getOneCommunity = async (id) => {
  return await CommunityModel.findById(id)
}

export default { getPaginatedCommunityRails, getCommunityCategories, getOneCommunity };
