import {mutation} from '../_generated/server'
import { ConvexError, v } from "convex/values";
import {getCurrentUserOrThrow} from '../helpers/users'
export const create = mutation({
  args: {
    subject: v.string(),
    body: v.string(),
    subreddit: v.id("subreddit"),
    storageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const {subject,body,subreddit,storageId} = args
    const user = await getCurrentUserOrThrow(ctx);
    const postId = await ctx.db.insert("post", {
      subject,
      body,
      subreddit,
      authorId: user._id,
      image: storageId|| undefined
    });
    return postId;
  },
});