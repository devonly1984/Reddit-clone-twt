import {components} from '../_generated/api'
import { ShardedCounter } from '@convex-dev/sharded-counter'
import { Id } from '../_generated/dataModel'
export const counts = new ShardedCounter(components.shardedCounter, {
  defaultShards: 1,
});

export const CommentCountKey = (postId: Id<"post">) => {
  return `comments:${postId}`;
};
export const PostCountKey = (userId:Id<'users'>)=>{
    return `post:${userId}`;
}
