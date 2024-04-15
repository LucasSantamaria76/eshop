import { registerSchema } from "@/validations/logup";
import { z } from "zod";

export type LogupType = z.infer<typeof registerSchema>;
