import { Comerciante } from "@/interfaces/comerciante.interface";

export const getComerciantes = async (page = 1, perPage = 5) => {
  const res = await fetch(`/api/comerciantes?page=${page}&perPage=${perPage}`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al cargar comerciantes");
  return res.json();
};

export const deleteComerciante = async (id: number) => {
  const confirmed = window.confirm(
    "¿Estás seguro de eliminar este comerciante?"
  );
  if (!confirmed) return;

  const res = await fetch(`/api/comerciantes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) alert("Error al eliminar comerciante");
  else alert("Comerciante eliminado correctamente");
};

export const toggleEstado = async (
  id: number,
  currentEstado: "ACTIVO" | "INACTIVO"
) => {
  const nuevoEstado = currentEstado === "ACTIVO" ? "INACTIVO" : "ACTIVO";

  const res = await fetch(`/api/comerciantes/${id}/estado`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ estado: nuevoEstado }),
  });
  if (!res.ok) alert("Error al cambiar estado");
  else alert("Estado actualizado");
};

export const downloadCsv = async () => {
  const res = await fetch(`/api/comerciantes/exportar`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    alert("No se pudo descargar el CSV");
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "comerciantes.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

export const fetchMunicipios = async () => {
  const res = await fetch(`/api/comerciantes/municipios`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudieron cargar los municipios");
  return res.json();
};

export const fetchComerciante = async (id: number) => {
  const res = await fetch(`/api/comerciantes/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudo cargar el comerciante");
  return res.json();
};

export const fetchEstablecimientos = async (id: number) => {
  const res = await fetch(`/api/comerciantes/${id}/establecimientos`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No se pudieron cargar los establecimientos");
  return res.json();
};

export const saveComerciante = async (
  data: Partial<Comerciante>,
  id?: number
) => {
  const res = await fetch(`/api/comerciantes${id ? `/${id}` : ""}`, {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al guardar el comerciante");
  return res.json();
};
