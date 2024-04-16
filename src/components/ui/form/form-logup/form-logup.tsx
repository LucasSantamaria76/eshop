"use client";

import {
  FieldErrors,
  useForm,
  UseFormRegister,
  FieldPath,
  UseFormSetValue,
} from "react-hook-form";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { registerSchema } from "@/validations";
import { State, signUp } from "@/app/auth/signup/actions";
import { useModalStore, MODAL_LOGIN } from "@/store/modalStore";
import { supabase } from "@/supabase/client";
import { useShopStore } from "@/store/shopStore";
import { LogupType } from "@/types/logup";
import { FormContent } from "./form-content";
import { getSessionUser } from "@/supabase";
import { ProfileType } from "@/types";

const getProfile = async (id: string) => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return profile;
  } catch (error: any) {
    console.log(error);
  }
};

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export const FormLogup = ({ setIsLogin }: Props) => {
  const {
    register,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<LogupType>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });
  const [state, formAction] = useFormState<State, FormData>(signUp, null);
  const onClose = useModalStore.use.onClose();
  const setUser = useShopStore.use.setUser();

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<LogupType>, {
          message: error.message,
        });
      });
    }
    if (state.status === "success") {
      getSessionUser().then((user: ProfileType | null) => setUser(user));
      setIsLogin(true);
      onClose(MODAL_LOGIN);
    }
  }, [state, setError, onClose, setUser, setFocus, setIsLogin]);

  return (
    <>
      <form action={formAction} className="flex flex-col space-y-3">
        {state?.status === "error" && state.message ? (
          <p className="absolute left-40 top-44 rounded-md border border-red-500 bg-red-500/30 px-6 py-2 text-center text-xs text-black">
            {state.message}
          </p>
        ) : null}
        <FormContent register={register} errors={errors} />
        <span className="my-2 border-b border-black" />

        <p className="text-sm dark:text-white">
          ¿Ya tienes una cuenta?
          <span
            className="ml-2 cursor-pointer text-sm text-blue-800 dark:text-blue-500"
            onClick={() => setIsLogin(true)}
          >
            Inicia sesión
          </span>
        </p>
      </form>
    </>
  );
};
