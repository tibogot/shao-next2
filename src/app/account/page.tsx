"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { session, isAuthenticated, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="font-neue-montreal mb-8 text-3xl font-bold text-gray-900">
              Account
            </h1>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="font-neue-montreal-mono mb-4 text-xl font-semibold text-gray-900">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-neue-montreal-mono block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {session?.user?.name || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <label className="font-neue-montreal-mono block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {session?.user?.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h2 className="font-neue-montreal-mono mb-4 text-xl font-semibold text-gray-900">
                  Account Actions
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/shop")}
                    className="font-neue-montreal-mono w-full rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800 sm:w-auto"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <div>
                <h2 className="font-neue-montreal-mono mb-4 text-xl font-semibold text-gray-900">
                  Security
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  You are currently signed in. Use the button below to sign out.
                </p>
                <button
                  onClick={handleSignOut}
                  className="font-neue-montreal-mono rounded-md border border-red-300 bg-red-50 px-6 py-2 text-red-700 transition-colors hover:border-red-400 hover:bg-red-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
