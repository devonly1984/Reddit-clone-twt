import { defineTable } from "convex/server";
import { v } from "convex/values";

export const upVote = defineTable({
  postId: v.id("post"),
  userId: v.id("users"),
})
  .index("byPost", ["postId"])
  .index("byUser", ["userId"]);