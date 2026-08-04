import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import Activity from "./models/Activity";
import Tasks from "./models/Task";
import Users from "./models/User";
import { schema } from "./schema";

const adapter = new SQLiteAdapter({
  schema: schema,
  jsi: true,
  onSetUpError: (error) => console.error("SQLite Error:", error)
});

export const database = new Database({
  adapter,
  modelClasses: [Activity, Tasks, Users]
});
