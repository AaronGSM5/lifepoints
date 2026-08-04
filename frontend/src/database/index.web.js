import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";

import Activity from "./models/Activity";
import Tasks from "./models/Task";
import Users from "./models/User";
import { schema } from "./schema";

const adapter = new LokiJSAdapter({
  dbName: "LifepointsDB",
  schema: schema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  onSetUpError: (error) => {
    console.error("Database failed to load:", error);
  }
});

export const database = new Database({
  adapter,
  modelClasses: [Activity, Tasks, Users]
});
