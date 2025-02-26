import { Doc } from "../_generated/dataModel";
import { type EnrichedPost } from "../constants";
import { QueryCtx } from "../_generated/server";


export const getEnrichedPost = async (
  ctx: QueryCtx,
  post: Doc<"post">
): Promise<EnrichedPost> => {
  const [author, subreddit] = await Promise.all([
    ctx.db.get(post.authorId),
    ctx.db.get(post.subreddit),
  ]);
  const image = post.image && (await ctx.storage.getUrl(post.image));
  return {
    ...post,
    author: author ? { username: author?.username } : undefined,
    subreddit: {
      _id: subreddit!._id,
      name: subreddit!.name,
    },
    imageUrl: image ?? undefined,
  };
};
export const getEnrichedPosts = (
  ctx: QueryCtx,
  posts: Doc<"post">[]
): Promise<EnrichedPost[]> => {
  return Promise.all(posts.map((post) => getEnrichedPost(ctx, post)));
};
