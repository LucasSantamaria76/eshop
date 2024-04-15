import { zfd } from "zod-form-data";
import { z } from "zod";

export const loginSchema = zfd.formData({
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
});
