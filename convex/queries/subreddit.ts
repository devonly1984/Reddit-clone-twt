import { query } from "../_generated/server";
import { v } from "convex/values";
import { getEnrichedPosts } from "../helpers/post";

export const get = query({
    args: {name:v.string() },
    handler: async(ctx,{name})=>{
        const subreddit = await ctx.db
          .query("subreddit")
          .filter((q) => q.eq(q.field("name"), name))
          .unique();
          if (!subreddit) {
            return null;
          }
          const posts = await ctx.db
            .query("post")
            .withIndex("by_subreddit", (q) => q.eq("subreddit", subreddit._id))
            .collect();

            const enrichedPosts = await getEnrichedPosts(ctx,posts)

          return {
            ...subreddit,
            posts: enrichedPosts,
          };
          
    }
})