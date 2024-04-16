"use server";

import { supabaseErrors } from "@/constants";
import CreateSupabaseServerClient from "@/supabase/server";
import { registerSchema } from "@/validations";
import { ZodError } from "zod";

export type State =
  | {
      status: "success";
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
    const { email, password, full_name, address, city, avatar_url, phone } =
      registerSchema.parse(data);

    const supabase = await CreateSupabaseServerClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          address,
          phone,
          city,
          avatar_url,
          email,
        },
      },
    });

    if (error) throw error;

    return {
      status: "success",
    };
  } catch (e: any) {
    console.log({ e });
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


/* 
full_name
email
address
phone
city
avatar_url
email_verified

*/