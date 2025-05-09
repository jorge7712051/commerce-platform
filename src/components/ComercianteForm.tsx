"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ComercianteFormData,
  ComercianteFormProps,
  comercianteFormSchema,
} from "@/interfaces/comerciante.interface";
import { useRouter } from "next/navigation";

const estados = ["ACTIVO", "INACTIVO"];

export default function ComercianteForm({
  initialData,
  onSubmit,
  isEditing = false,
  ingresosTotales,
  empleadosTotales,
  municipios,
}: ComercianteFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComercianteFormData>({
    resolver: zodResolver(comercianteFormSchema),
    defaultValues: initialData || {
      nombre: "",
      municipio: "",
      telefono: "",
      correoElectronico: "",
      fechaRegistro: "",
      estado: "ACTIVO",
    },
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow space-y-6 border border-gray-100"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        {isEditing ? "Editar Comerciante" : "Registrar Comerciante"}
      </h2>

      {/* Nombre */}
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-1">
          Nombre o Razón Social
        </label>
        <input
          type="text"
          {...register("nombre")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ej: Tienda Don Juan"
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
        )}
      </div>

      {/* Municipio */}
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-1">
          Municipio o Ciudad
        </label>
        <select
          {...register("municipio")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Seleccione un municipio</option>
          {municipios?.map((municipio) => (
            <option key={municipio} value={municipio}>
              {municipio}
            </option>
          ))}
        </select>
        {errors.municipio && (
          <p className="text-red-500 text-sm mt-1">
            {errors.municipio.message}
          </p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          {...register("telefono")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ej: 3104567890"
        />
        {errors.telefono && (
          <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
        )}
      </div>

      {/* Correo */}
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          {...register("correoElectronico")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ej: contacto@tienda.com"
        />
        {errors.correoElectronico && (
          <p className="text-red-500 text-sm mt-1">
            {errors.correoElectronico.message}
          </p>
        )}
      </div>

      {/* Fecha de registro */}
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-1">
          Fecha de Registro
        </label>
        <input
          type="date"
          {...register("fechaRegistro")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {errors.fechaRegistro && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fechaRegistro.message}
          </p>
        )}
      </div>

      {/* Estado */}
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-1">
          Estado
        </label>
        <select
          {...register("estado")}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Seleccione un estado</option>
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
        {errors.estado && (
          <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>
        )}
      </div>

      {/* Resumen */}
      {isEditing && (
        <div className="p-5 mt-6 bg-[#2563EB] rounded-md shadow-md text-white">
          <h3 className="text-lg font-semibold mb-2">
            Resumen de Establecimientos
          </h3>
          <div className="flex flex-col sm:flex-row sm:justify-between text-base">
            <p>
              Ingresos Totales:{" "}
              <span className="font-bold">
                ${ingresosTotales?.toLocaleString() || 0}
              </span>
            </p>
            <p>
              Empleados Totales:{" "}
              <span className="font-bold">{empleadosTotales || 0}</span>
            </p>
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="flex justify-between items-center pt-6 border-t mt-6">
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-md transition"
        >
          {isEditing ? "Actualizar Comerciante" : "Crear Comerciante"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-[#0075FF] hover:underline text-sm font-medium"
        >
          ← Volver
        </button>
      </div>
    </form>
  );
}
