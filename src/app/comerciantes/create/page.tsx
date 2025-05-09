"use client";

import ComercianteForm from "@/components/ComercianteForm";
import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute";
import { fetchMunicipios, saveComerciante } from "@/lib/comerciantesClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CrearComerciante() {
  const router = useRouter();
  const [municipios, setMunicipios] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchMunicipios();
      setMunicipios(res);
    };
    load();
  }, []);

  return (
    <PrivateRoute>
      <Header />
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Crear Comerciante</h1>
        <ComercianteForm
          municipios={municipios}
          onSubmit={async (data) => {
            await saveComerciante(data);
            router.push("/dashboard");
          }}
        />
      </div>
    </PrivateRoute>
  );
}
