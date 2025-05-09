import { z } from "zod";

export interface Comerciante {
  id: number;
  nombre: string;
  telefono?: string;
  correoElectronico?: string;
  fechaRegistro: string;
  establecimientos?: { id: string }[];
  estado: "ACTIVO" | "INACTIVO";
}

export const comercianteFormSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  municipio: z.string().min(1, "Seleccione un municipio"),
  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(10, "El teléfono no debe exceder 10 dígitos"),
  correoElectronico: z.string().email("Correo electrónico inválido"),
  fechaRegistro: z.string().min(1, "La fecha de registro es obligatoria"),
  estado: z.enum(["ACTIVO", "INACTIVO"], {
    required_error: "Seleccione un estado",
  }),
});

export type ComercianteFormData = z.infer<typeof comercianteFormSchema>;

export interface ComercianteFormProps {
  initialData?: ComercianteFormData;
  onSubmit: (data: ComercianteFormData) => void;
  isEditing?: boolean;
  ingresosTotales?: number;
  empleadosTotales?: number;
  municipios?: string[];
}
