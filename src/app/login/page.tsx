"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      await loginUser(email, password);
      refreshUser();
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión");
      }
    }
  };
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/background.jpg"
        alt="Fondo"
        fill
        className="object-cover blur-sm"
        priority
      />

      <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
        <form onSubmit={handleLogin}>
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
              Debes iniciar sesión para acceder a la{" "}
              <span className="font-bold">plataforma</span>
            </h2>

            <p className="text-sm text-gray-600 mb-6 text-center">
              Digita tu correo electrónico y la contraseña
            </p>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">
                Acepto términos y condiciones
              </label>
            </div>

            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

            <button
              type="submit"
              disabled={!termsAccepted}
              className={`w-full py-2 rounded-md text-white ${
                termsAccepted
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-pink-300 cursor-not-allowed"
              }`}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
