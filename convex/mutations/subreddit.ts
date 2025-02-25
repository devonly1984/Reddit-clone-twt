import {mutation} from '../_generated/server'
import { getCurrentUserOrThrow } from "../helpers/users";
import {ConvexError, v} from 'convex/values'

//Create a new Subreddit
export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const subreddit = await ctx.db.query("subreddit").collect();
    const isExists = subreddit.some((s) => s.name === args.name);
    if (isExists) {
      throw new ConvexError({ message: "Subreddit already exists" });
    }
    await ctx.db.insert("subreddit", {
      name: args.name,
      description: args.description,
      authorId: user?._id,
    });
  },
});