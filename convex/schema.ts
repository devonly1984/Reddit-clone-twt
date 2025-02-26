import { defineSchema } from "convex/server";
import { users } from "./tables/users";
import {subreddit} from './tables/subreddit'
import { post } from "./tables/post";
import { comments } from "./tables/comments";
import { upVote } from "./tables/upVote";
import { downVote } from "./tables/downVote";
export default defineSchema({
  users,
  subreddit,
  post,
  comments,
  upVote,
  downVote,
});