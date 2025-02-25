/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as helpers_users from "../helpers/users.js";
import type * as mutations_subreddit from "../mutations/subreddit.js";
import type * as mutations_users from "../mutations/users.js";
import type * as queries_users from "../queries/users.js";
import type * as tables_subreddit from "../tables/subreddit.js";
import type * as tables_users from "../tables/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "helpers/users": typeof helpers_users;
  "mutations/subreddit": typeof mutations_subreddit;
  "mutations/users": typeof mutations_users;
  "queries/users": typeof queries_users;
  "tables/subreddit": typeof tables_subreddit;
  "tables/users": typeof tables_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
