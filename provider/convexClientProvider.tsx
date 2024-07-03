"use client";
import { ClerkProvider, SignIn, UserButton, useAuth } from "@clerk/clerk-react";
import React from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import LoadingLogo from "@/components/shared/loadingLogo";

type Props = {
  children: React.ReactNode;
};

const ConvexClientProvider = ({ children }: Props) => {
  const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
  const p_Key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const convex = new ConvexReactClient(CONVEX_URL);
  return (
    <ClerkProvider publishableKey={p_Key}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Unauthenticated>
          <SignIn />
        </Unauthenticated>
        <Authenticated>
          {children}
        </Authenticated>
        <AuthLoading>
          <LoadingLogo size={100} />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
