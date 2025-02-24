import { query } from "../_generated/server";
import { getCurrentUser } from "../helpers/users";

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});