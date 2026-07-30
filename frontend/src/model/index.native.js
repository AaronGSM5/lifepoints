import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import Activity from "./activity";
import { mySchema } from "./schema";

const adapter = new SQLiteAdapter({
  schema: mySchema,
  jsi: true,
  onSetUpError: (error) => console.error("SQLite Error:", error)
});

export const database = new Database({
  adapter,
  modelClasses: [Activity]
});
