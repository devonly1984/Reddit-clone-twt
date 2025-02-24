import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = defineTable({
  username: v.string(),
  externalId: v.string(),
})
  .index("by_ExternalId", ["externalId"])
  .index("by_username", ["username"]);
