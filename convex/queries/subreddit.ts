import { query } from "../_generated/server";
import { v } from "convex/values";

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
          return subreddit;
    }
})