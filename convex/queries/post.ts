import {query} from '../_generated/server'
import {v} from 'convex/values'
import {getEnrichedPost, getEnrichedPosts} from '../helpers/post'
import { EnrichedPost } from '../constants'
export const getPost = query({
    args: {id: v.id('post')},
    handler: async(ctx,args)=>{
        const post = await ctx.db.get(args.id)
        if (!post) return null;
        return getEnrichedPost(ctx,post)
    }
})

export const getPostsBySubreddit = query({
    args: {subredditName: v.string()},
    handler: async(ctx,args):Promise<EnrichedPost[]>=>{
      const subreddit = await ctx.db
        .query("subreddit")
        .filter((e) => e.eq(e.field("name"), args.subredditName))
        .unique();
        if (!subreddit) {
            return []
        }
        const posts = await ctx.db
          .query("post")
          .withIndex("by_subreddit", (q) => q.eq("subreddit", subreddit._id))
          .collect();
          return getEnrichedPosts(ctx, posts);
    }
})
export const getPostsByAuthor = query({
    args: {authorUsername: v.string()},
    handler: async(ctx,args):Promise<EnrichedPost[]>=>{
      const user = await ctx.db
        .query("users")
        .filter((e) => e.eq(e.field("username"), args.authorUsername))
        .unique();
        if (!user) {
            return []
        }
        const posts = await ctx.db
          .query("post")
          .withIndex("by_author",q=>q.eq('authorId',user._id))
          .collect();
          return getEnrichedPosts(ctx, posts);
    }
})
