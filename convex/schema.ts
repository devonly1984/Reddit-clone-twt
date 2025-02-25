import { defineSchema } from "convex/server";
import { users } from "./tables/users";
import {subreddit} from './tables/subreddit'
export default defineSchema({
  users,
  subreddit,
});