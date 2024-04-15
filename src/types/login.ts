import { loginSchema } from "@/validations";
import { z } from "zod";

export type LoginType = z.infer<typeof loginSchema>;
