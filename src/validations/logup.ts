import { zfd } from "zod-form-data";
import { z } from "zod";

export const registerSchema = zfd
  .formData({
    email: zfd.text(
      z
        .string({ required_error: "El correo es requerido" })
        .min(1, {
          message: "El correo es requerido",
        })
        .email({
          message: "Correo inválido",
        }),
    ),
    password: zfd.text(
      z
        .string({ required_error: "La contraseña es requerida" })
        .min(6, { message: "Debe tener 6 o más caracteres" }),
    ),
    name: zfd.text(
      z
        .string({
          required_error: "El nombre es requerido",
        })
        .min(2, {
          message: "Debe tener mínimo 2 caracteres",
        }),
    ),
    confirmPassword: zfd.text(),
    address: zfd.text(z.string().optional()),
    phone: zfd.text(z.string().optional()),
    city: zfd.text(z.string().optional()),
    avatar_url: zfd.text(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
