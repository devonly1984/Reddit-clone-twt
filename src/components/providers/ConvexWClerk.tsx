import { ConvexReactClient } from "convex/react"
import { ClerkProvider,useAuth } from "@clerk/clerk-react"
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { config } from "../../lib/config";

const convex = new ConvexReactClient(config.convex.url as string);

const ConvexWClerk = ({children}:{children:ReactNode}) => {
  return (
    <ClerkProvider publishableKey={config.clerk.publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
export default ConvexWClerk