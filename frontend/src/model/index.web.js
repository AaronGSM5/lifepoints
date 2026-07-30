import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";

import Activity from "./activity";
import { mySchema } from "./schema";

const adapter = new LokiJSAdapter({
  schema: mySchema,
  useWebWorker: false,
  useIncrementalIndexedDB: true
});

export const database = new Database({
  adapter,
  modelClasses: [Activity]
});
