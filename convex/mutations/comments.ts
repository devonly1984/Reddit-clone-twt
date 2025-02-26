import {mutation} from '../_generated/server'
import {v} from 'convex/values';
import {getCurrentUserOrThrow} from '../helpers/users'
import { counts, CommentCountKey } from "../helpers/counter";


export const create = mutation({
    args: {
        content: v.string(),
        postId: v.id('post')
    },
    handler:async(ctx,args)=>{
        const user = await getCurrentUserOrThrow(ctx)
        await ctx.db.insert("comments", {
          content: args.content,
          postId: args.postId,
          authorId: user._id
        });
        await counts.inc(ctx, CommentCountKey(args.postId));

    }
})
