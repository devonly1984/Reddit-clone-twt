import { v } from 'convex/values';
import {query} from '../_generated/server'
import { CommentCountKey, counts } from '../helpers/counter';

export const getComments = query({
  args: { postId: v.id("post") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("byPost", (q) => q.eq("postId", args.postId))
      .collect();
    const authorIds = [...new Set(comments.map((comment) => comment.authorId))];    
    const authors = await Promise.all(authorIds.map((id) => ctx.db.get(id)));
    const authorMap = new Map(
      authors.map((author) => [author!._id, author!.username])
    );
    return comments.map((comment) => ({
      ...comment,
      author: {
        username: authorMap.get(comment.authorId),
      },
    }));
  },

});
export const getCommentCount = query({
  args: {postId:v.id('post')},
  handler: async(ctx,args)=>{
    return await counts.count(ctx, CommentCountKey(args.postId));
  }
})