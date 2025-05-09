"use client";

import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full flex justify-between items-center px-6 py-3 bg-white shadow">
      <div className="font-bold text-blue-800">OL Software & Development</div>
      <div className="flex items-center gap-4 text-sm">
        <span>👤 {user.rol === "ADMIN" ? "Administrador" : "Auxiliar"}</span>
        <button
          onClick={logout}
          className="text-red-600 hover:underline font-medium"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
