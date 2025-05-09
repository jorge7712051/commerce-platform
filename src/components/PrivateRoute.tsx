"use client";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading)
    return (
      <div className="flex h-screen justify-center items-center">
        <p className="text-gray-500">Cargando sesión...</p>
      </div>
    );

  if (!user) return null;

  return <>{children}</>;
}
