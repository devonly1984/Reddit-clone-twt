import { defineSchema } from "convex/server";
import { users } from "./tables/users";
import {subreddit} from './tables/subreddit'
import { post } from "./tables/post";
export default defineSchema({
  users,
  subreddit,
  post
});