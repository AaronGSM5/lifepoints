import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "activities",
      columns: [
        { name: "user_id", type: "string", isIndexed: true },
        { name: "task_id", type: "string", isIndexed: true },
        { name: "status", type: "string" },
        { name: "lifepoints", type: "number" },
        { name: "proof_image", type: "string", isOptional: true },
        { name: "community_id", type: "string", isIndexed: true, isOptional: true },
        { name: "visibility", type: "string" },
        { name: "sub_steps_json", type: "string" },
        { name: "reactions_json", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
        { name: "is_synced", type: "boolean" }
      ]
    }),
    tableSchema({
      name: "tasks",
      columns: [
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "sub_steps_json", type: "string" },
        { name: "lifepoints", type: "number" },
        { name: "category_json", type: "string" },
        { name: "active", type: "boolean" },
        { name: "image", type: "string", isOptional: true },
        { name: "icon", type: "string", isOptional: true },
        { name: "estimated_time", type: "number" },
        { name: "custom_json", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" }
      ]
    }),
    tableSchema({
      name: "users",
      columns: [
        { name: "username", type: "string", isOptional: true },
        { name: "name", type: "string", isOptional: true },
        { name: "about", type: "string", isOptional: true },
        { name: "email", type: "string", isOptional: true },
        { name: "external_id", type: "string", isOptional: true },
        { name: "level", type: "number", isOptional: true },
        { name: "lifepoints", type: "number", isOptional: true },
        { name: "inventory", type: "string", isOptional: true }, // json field
        { name: "profile_picture", type: "string", isOptional: true },
        { name: "communities", type: "string", isOptional: true }, // json field
        { name: "subscription", type: "string", isOptional: true },
        { name: "settings", type: "string", isOptional: true }, // json field
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" }
      ]
    })
  ]
});
