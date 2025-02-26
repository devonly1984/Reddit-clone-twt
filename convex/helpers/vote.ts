import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";
import { counts } from "./counter";

export type VoteType = "upVote" | "downVote";

export const voteKey = (postId: string, voteType: VoteType) => {
  return `${voteType}:${postId}`;
};
export const createToggleVoteMutation = (voteType: VoteType) => {
  return mutation({
    args: { postId: v.id("post") },
    handler: async (ctx, args) => {
      const user = await getCurrentUserOrThrow(ctx);
      const oppositeVote: VoteType =
        voteType === "upVote" ? "downVote" : "upVote";
      const existingVote = await ctx.db
        .query(voteType)
        .withIndex("byPost", (q) => q.eq("postId", args.postId))
        .filter((q) => q.eq(q.field("userId"), user._id))
        .unique();
      if (existingVote) {
        await ctx.db.delete(existingVote._id);
        await counts.dec(ctx, voteKey(args.postId, voteType));
        return;
      }
      const existingOppositeVote = await ctx.db
        .query(oppositeVote)
        .withIndex("byPost", (q) => q.eq("postId", args.postId))
        .filter((q) => q.eq(q.field("userId"), user._id))
        .unique();

      if (existingOppositeVote) {
        await ctx.db.delete(existingOppositeVote._id);
        await counts.dec(ctx, voteKey(args.postId, oppositeVote));
      }
      await ctx.db.insert(voteType, {
        postId: args.postId,
        userId: user._id,
      });
      await counts.inc(ctx, voteKey(args.postId, voteType));
    },
  });
};

export const createHasVotedQuery = (voteType: VoteType) => {
  return query({
    args: { postId: v.id("post") },
    handler: async (ctx, args) => {
      const user = await getCurrentUser(ctx);
      if (!user) return false;
      const vote = await ctx.db
        .query(voteType)
        .withIndex("byPost", (q) => q.eq("postId", args.postId))
        .filter((q) => q.eq(q.field("userId"), user._id))
        .unique();
      return !!vote;
    },
  });
};
export const getVoteCounts = query({
  args: {postId:v.id('post')},
  handler: async(ctx,args)=>{
    const upVotes = await counts.count(ctx, voteKey(args.postId,'upVote'));
    const downVotes = await counts.count(ctx, voteKey(args.postId, "downVote"));
    return {
      total: upVotes - downVotes,
      upVotes,
      downVotes,
    };
  }
})
export const toggleUpVote = createToggleVoteMutation("upVote");
export const toggleDownVote = createToggleVoteMutation("downVote");
export const hasUpVoted = createHasVotedQuery("upVote");
export const hasDownVoted = createHasVotedQuery("downVote");