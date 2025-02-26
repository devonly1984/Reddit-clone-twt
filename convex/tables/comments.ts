import { defineTable } from "convex/server";
import {v} from 'convex/values'
export const comments = defineTable({
  content: v.string(),
  postId: v.id("post"),
  authorId: v.id("users"),
}).index("byPost", ["postId"]);