import { defineTable } from "convex/server";
import {v} from 'convex/values'
export const subreddit = defineTable({
  name: v.string(),
  description: v.optional(v.string()),
  authorId: v.id("users"),
});