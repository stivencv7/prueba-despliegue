import { z } from "zod";

export const schemaEmail = z.object({
  email: z.string().email("Por favor, introduce un email válido"),
});