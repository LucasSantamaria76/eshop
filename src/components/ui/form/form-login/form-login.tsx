"use client";

import { useForm, FieldPath } from "react-hook-form";

import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { loginSchema } from "@/validations";
import { State, signIn } from "@/app/auth/signin/actions";
import { LoginType } from "@/types/login";
import { useModalStore, MODAL_LOGIN } from "@/store/modalStore";
import { Button } from "flowbite-react";
import Image from "next/image";
import { FormContent } from "./form-content";
import { loginWithGoogle } from "@/supabase/login-with-Google";
import { getSessionUser } from "@/supabase";
import { ProfileType } from "@/types";
import { useShopStore } from "@/store/shopStore";

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export const FormLogin = ({ setIsLogin }: Props) => {
  const {
    register,
    formState: { errors, isSubmitted },
    setError,
  } = useForm<LoginType>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const [state, formAction] = useFormState<State, FormData>(signIn, null);
  const onClose = useModalStore.use.onClose();
  const setUser = useShopStore.use.setUser();

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<LoginType>, {
          message: error.message,
        });
      });
    }

    if (state.status === "success") {
      getSessionUser().then((user: ProfileType | null) => setUser(user));
      onClose(MODAL_LOGIN);
    }
  }, [state, setError, onClose, setUser]);

  return (
    <>
      <form action={formAction} className="flex flex-col space-y-3">
        <FormContent register={register} errors={errors} />
        <span className="my-2 border-b border-black" />

        <Button
          color="gray"
          onClick={loginWithGoogle}
          className="shadow dark:shadow-gray-400"
        >
          Inicia sesión con
          <Image
            src={"/google.png"}
            width={50}
            height={10}
            alt="logo google"
            className="ml-2 h-5 w-20"
          />
        </Button>

        <p className="text-sm dark:text-white">
          ¿No tienes una cuenta?
          <span
            className="ml-2 cursor-pointer text-sm text-blue-800 dark:text-blue-500"
            onClick={() => setIsLogin(false)}
          >
            Regístrate
          </span>
        </p>
      </form>
    </>
  );
};
