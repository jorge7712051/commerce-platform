"use client";

import ComercianteForm from "@/components/ComercianteForm";
import { ComercianteFormData } from "@/interfaces/comerciante.interface";
import { Establecimiento } from "@/interfaces/esteblecimiento.interface";
import {
  fetchComerciante,
  fetchEstablecimientos,
  fetchMunicipios,
  saveComerciante,
} from "@/lib/comerciantesClient";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarComerciante() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [initialData, setInitialData] = useState<ComercianteFormData | null>(
    null
  );
  const [ingresos, setIngresos] = useState(0);
  const [empleados, setEmpleados] = useState(0);
  const [municipios, setMunicipios] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchComerciante(id);
      const establecimientos: Establecimiento[] = await fetchEstablecimientos(
        id
      );
      const res = await fetchMunicipios();

      const formattedFecha = data.fechaRegistro?.slice(0, 10);
      setMunicipios(res);

      setInitialData({ ...data, fechaRegistro: formattedFecha });
      setIngresos(
        establecimientos.reduce(
          (acc: number, e) => acc + parseFloat(e.ingresos),
          0
        )
      );
      setEmpleados(
        establecimientos.reduce((acc: number, e) => acc + e.numeroEmpleados, 0)
      );
    };
    load();
  }, [id]);

  if (!initialData) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Editar Comerciante</h1>
      <ComercianteForm
        initialData={initialData}
        municipios={municipios}
        isEditing
        ingresosTotales={ingresos}
        empleadosTotales={empleados}
        onSubmit={async (data) => {
          await saveComerciante(data, id);
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
