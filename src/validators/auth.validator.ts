import { z } from "zod";

// ✅ Zod schema
export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
