import {defineTable} from 'convex/server'
import {v} from 'convex/values'
export const post = defineTable({
  subject: v.string(),
  body: v.string(),
  subreddit: v.id("subreddit"),
  authorId: v.id("users"),
  image: v.optional(v.id("_storage")),
})
  .index("by_subreddit", ["subreddit"])
  .index("by_author", ["authorId"]);