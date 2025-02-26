import {mutation} from '../_generated/server'
import {  ConvexError, v } from "convex/values";
import {getCurrentUserOrThrow} from '../helpers/users'
import { ERROR_MESSAGES } from '../constants';
import { counts, PostCountKey } from '../helpers/counter';
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
    await counts.inc(ctx, PostCountKey(user._id));
    return postId;
  },
});
export const deletePost = mutation({
  args: {id:v.id('post')},
  handler: async(ctx,args)=>{
    const post = await ctx.db.get(args.id);
    if (!post) throw new ConvexError({message: ERROR_MESSAGES.POST_NOT_FOUND})
  
const user = await getCurrentUserOrThrow(ctx)
if (post.authorId !== user._id) {
  throw new ConvexError({ message: ERROR_MESSAGES.UNAUTHORIZED_DELETE });
}
await counts.dec(ctx, PostCountKey(user._id));
await ctx.db.delete(args.id);
  }
})