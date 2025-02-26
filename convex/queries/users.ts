import { v } from "convex/values";
import { query } from "../_generated/server";
import { counts, PostCountKey } from "../helpers/counter";
import { getCurrentUser } from "../helpers/users";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});
export const getUserStats = query({
  args: {username:v.string()},
  handler:async(ctx,args)=>{
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();
      if (!user) {
        return {posts:0}
      }
      const postCount = await counts.count(ctx,PostCountKey(user._id))
      return { posts: postCount };
  }
})