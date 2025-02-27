import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  providerId: z.string().min(1, "El ID del proveedor es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  phone: z.string().min(1, "El teléfono es requerido"),
  openingTime: z.string().min(1, "La hora de apertura es requerida"),
  closingTime: z.string().min(1, "La hora de cierre es requerida"),
  paymentMethods: z
    .array(z.string())
    .min(1, "Seleccione al menos un método de pago"),
  insurances: z.array(z.string()).optional().default([]),
  facilities: z.array(z.string()).optional(),
  status: z.boolean().default(true),
});

export type BranchFormValues = z.infer<typeof branchSchema>;
