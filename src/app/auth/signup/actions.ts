"use server";

import { supabaseErrors } from "@/constants";
import CreateSupabaseServerClient from "@/supabase/server";
import { registerSchema } from "@/validations";
import { User } from "@supabase/supabase-js";
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

export async function signUp(prevState: State, data: FormData): Promise<State> {
  try {
    const { email, password, name, address, city, avatar_url, phone } =
      registerSchema.parse(data);

    const supabase = await CreateSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          address,
          phone,
          city,
          avatar_url,
        },
      },
    });

    if (error) throw error;
    if (!user) throw new Error();
    return {
      status: "success",
      user,
    };
  } catch (e: any) {
    const error: any = {
      status: "error",
      message: supabaseErrors[e.message] ?? "Datos del formulario no válidos.",
    };

    if (e instanceof ZodError) {
      return {
        ...error,
        errors: e.issues.map((issue: any) => ({
          path: issue.path.join("."),
          message: `${issue.message}`,
        })),
      };
    }

    return error;
  }
}
