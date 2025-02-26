/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as constants_index from "../constants/index.js";
import type * as helpers_counter from "../helpers/counter.js";
import type * as helpers_post from "../helpers/post.js";
import type * as helpers_users from "../helpers/users.js";
import type * as helpers_vote from "../helpers/vote.js";
import type * as mutations_comments from "../mutations/comments.js";
import type * as mutations_image from "../mutations/image.js";
import type * as mutations_post from "../mutations/post.js";
import type * as mutations_subreddit from "../mutations/subreddit.js";
import type * as mutations_users from "../mutations/users.js";
import type * as queries_comments from "../queries/comments.js";
import type * as queries_post from "../queries/post.js";
import type * as queries_subreddit from "../queries/subreddit.js";
import type * as queries_users from "../queries/users.js";
import type * as tables_comments from "../tables/comments.js";
import type * as tables_downVote from "../tables/downVote.js";
import type * as tables_post from "../tables/post.js";
import type * as tables_subreddit from "../tables/subreddit.js";
import type * as tables_upVote from "../tables/upVote.js";
import type * as tables_users from "../tables/users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "constants/index": typeof constants_index;
  "helpers/counter": typeof helpers_counter;
  "helpers/post": typeof helpers_post;
  "helpers/users": typeof helpers_users;
  "helpers/vote": typeof helpers_vote;
  "mutations/comments": typeof mutations_comments;
  "mutations/image": typeof mutations_image;
  "mutations/post": typeof mutations_post;
  "mutations/subreddit": typeof mutations_subreddit;
  "mutations/users": typeof mutations_users;
  "queries/comments": typeof queries_comments;
  "queries/post": typeof queries_post;
  "queries/subreddit": typeof queries_subreddit;
  "queries/users": typeof queries_users;
  "tables/comments": typeof tables_comments;
  "tables/downVote": typeof tables_downVote;
  "tables/post": typeof tables_post;
  "tables/subreddit": typeof tables_subreddit;
  "tables/upVote": typeof tables_upVote;
  "tables/users": typeof tables_users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  shardedCounter: {
    public: {
      add: FunctionReference<
        "mutation",
        "internal",
        { count: number; name: string; shard?: number; shards?: number },
        number
      >;
      count: FunctionReference<"query", "internal", { name: string }, number>;
      estimateCount: FunctionReference<
        "query",
        "internal",
        { name: string; readFromShards?: number; shards?: number },
        any
      >;
      rebalance: FunctionReference<
        "mutation",
        "internal",
        { name: string; shards?: number },
        any
      >;
      reset: FunctionReference<"mutation", "internal", { name: string }, any>;
    };
  };
};
