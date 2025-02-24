export const config = {
  clerk: {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    webhookSecret: import.meta.env.WEBHOOK_SIGNING_SECRET,
  },
  convex: {
    url: import.meta.env.VITE_CONVEX_URL!,
    deployment: import.meta.env.CONVEX_DEPLOYMENT,
  },
};