"use server";

import { supabaseErrors } from "@/constants";
import CreateSupabaseServerClient from "@/supabase/server";
import { loginSchema } from "@/validations";
import { User } from "@supabase/supabase-js";
import path from "path";
import { ZodError } from "zod";

export type State =
  | {
      status: "success";
      user: User;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | null;

export async function signIn(prevState: State, data: FormData): Promise<State> {
  try {
    const { email, password } = loginSchema.parse(data);

    const supabase = await CreateSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    if (!user) throw new Error();
    return {
      status: "success",
      user,
    };
  } catch (e: any) {
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "Datos del formulario no válidos.",
        errors: e.issues.map((issue) => ({
          path: issue.path.join("."),
          message: `${issue.message}`,
        })),
      };
    }
    return {
      status: "error",
      message: "Algo salió mal. Inténtalo de nuevo.",
      errors: [
        {
          path: "email",
          message: supabaseErrors[e.message],
        },
        {
          path: "password",
          message: supabaseErrors[e.message],
        },
      ],
    };
  }
}
