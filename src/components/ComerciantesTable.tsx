"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Comerciante } from "@/interfaces/comerciante.interface";
import {
  deleteComerciante,
  downloadCsv,
  getComerciantes,
  toggleEstado,
} from "@/lib/comerciantesClient";

const PAGE_SIZES = [5, 10, 15];

export default function ComerciantesTable() {
  const { user } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<Comerciante[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const load = async () => {
    const res = await getComerciantes(page, pageSize);
    setData(res.data);
    setTotal(res.meta.total);
  };

  useEffect(() => {
    load();
  }, [page, pageSize]);

  const handleDelete = async (id: number) => {
    await deleteComerciante(id);
    load();
  };

  const handleToggleEstado = async (
    id: number,
    estado: "ACTIVO" | "INACTIVO"
  ) => {
    await toggleEstado(id, estado);
    load();
  };

  const isAdmin = user?.rol === "ADMIN";

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">
          Comerciantes registrados
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/comerciantes/create")}
            className="px-4 py-2 text-white text-sm font-medium rounded bg-pink-600 hover:bg-pink-700"
          >
            ➕ Crear Formulario Nuevo
          </button>
          {isAdmin && (
            <button
              onClick={downloadCsv}
              className="px-4 py-2 bg-[#F2F2F2] text-gray-700 text-sm font-medium border border-gray-300 rounded hover:bg-gray-300 transition"
            >
              📄 Exportar CSV
            </button>
          )}
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#5183fe] text-white text-sm">
          <tr>
            <th className="px-4 py-3 text-left">Nombre / Razón Social</th>
            <th className="px-4 py-3 text-left">Teléfono</th>
            <th className="px-4 py-3 text-left">Correo</th>
            <th className="px-4 py-3 text-left">Fecha Registro</th>
            <th className="px-4 py-3 text-left">Establecimientos</th>
            <th className="px-4 py-3 text-left">Estado</th>
            <th className="px-4 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((com) => (
            <tr key={com.id} className="hover:bg-[#F9FAFB] transition">
              <td className="px-4 py-3 font-medium">{com.nombre}</td>
              <td className="px-4 py-3 font-medium">{com.telefono || "-"}</td>
              <td className="px-4 py-3 font-medium">
                {com.correoElectronico || "-"}
              </td>
              <td className="px-4 py-3 font-medium">
                {new Date(com.fechaRegistro).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 font-medium">
                {com.establecimientos?.length || 0}
              </td>
              <td className="px-4 py-3 font-medium">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    com.estado === "ACTIVO"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {com.estado}
                </span>
              </td>
              <td className="px-4 py-2 flex items-center gap-3 text-lg text-gray-500">
                <button
                  onClick={() => router.push(`/comerciantes/edit/${com.id}`)}
                  title="Editar"
                  className="hover:text-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleToggleEstado(com.id, com.estado)}
                  title="Cambiar estado"
                  className="hover:text-yellow-600"
                >
                  🔄
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(com.id)}
                    title="Eliminar"
                    className="hover:text-red-600"
                  >
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-start items-center mt-6 space-x-2 text-sm">
        <label htmlFor="pageSize">Registros por página:</label>
        <select
          id="pageSize"
          className="border border-gray-300 rounded px-2 py-1"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="ml-4">
          Página {page} de {Math.ceil(total / pageSize)}
        </span>
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ←
        </button>
        <button
          disabled={page >= Math.ceil(total / pageSize)}
          onClick={() => setPage(page + 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
}
