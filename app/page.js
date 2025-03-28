"use client";

import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard"); // Redirect to dashboard after login
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <SignedOut>
        <SignIn redirectUrl="/dashboard" />
      </SignedOut>
    </div>
  );
}
