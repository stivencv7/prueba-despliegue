import { z } from "zod";

export const authSchema = z
  .object({
    password: z
      .string()
      .min(8, "Min. 8 characters required.")
      .regex(/[0-9]/, "At least 1 number")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .refine((value) => !!value, { message: "Password is required" }),
    confirmPassword: z.string().min(8, "Min. 8 characters required."),
    // phone: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export const authGoogle = z.object({
  email: z.string().email("Por favor, introduce un email válido"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  Identification: z
    .string()
    .min(1, { message: "El campo es requerido" })
    .max(12, { message: "¡Oops! Límite de caracteres excedido." })
    .regex(/^\d+$/, "El número de identidad debe contener solo números"),
});

export const infoSchema = z.object({
  country: z.string().min(1, { message: "El campo es obligatorio" }),
  legalName: z.string().min(1, { message: "El campo es obligatorio" }),
  companyType: z.string().min(1, { message: "El campo es obligatorio" }),
  taxId: z.string().min(1, { message: "El campo es obligatorio" }),
  legalAddress: z.string().min(1, { message: "El campo es obligatorio" }),
});

export const ResidentialAddressSchema = z.object({
  country: z.string().min(1, { message: "El campo email es obligatorio" }),
  region: z.string().min(1, { message: "El campo email es obligatorio" }),
  city: z.string().min(1, { message: "El campo email es obligatorio" }),
  postalCode: z.string().min(1, { message: "El campo email es obligatorio" }),
  fullResidence: z
    .string()
    .min(1, { message: "El campo email es obligatorio" }),
});
