"use client";

import {
  FieldErrors,
  useForm,
  UseFormRegister,
  FieldPath,
} from "react-hook-form";

import { useFormState, useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { loginSchema } from "@/validations";
import { State, signIn } from "@/app/auth/signin/actions";
import { LoginType } from "@/types/login";
import { useModalStore, MODAL_LOGIN } from "@/store/modalStore";
import { Button, Spinner } from "flowbite-react";
import { supabase } from "@/supabase/client";
import { ProfileType } from "@/types/profile";
import { useShopStore } from "@/store/shopStore";
import { Icon, InputText } from "@/components";
import Image from "next/image";

const inputClasses =
  "block border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 border-gray-400 w-full";

function FormContent({
  register,
  isValid,
  errors,
}: {
  register: UseFormRegister<LoginType>;
  isValid: boolean;
  errors: FieldErrors<LoginType>;
}) {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative grid grid-cols-1 gap-3">
      <InputText
        autoFocus
        name="email"
        label="Correo electrónico"
        errors={errors}
        icon={null}
        register={register}
        type="email"
      />
      <InputText
        name="password"
        label={"Contraseña"}
        errors={errors}
        register={register}
        type={showPassword ? "text" : "password"}
        icon={
          <Icon
            name={showPassword ? "EyeOff" : "Eye"}
            className="absolute right-2 top-[10px] z-50"
            onClick={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        gradientMonochrome="info"
        type="submit"
        disabled={pending || !isValid}
        className="mt-2"
      >
        {pending && <Spinner size="sm" className="mr-4" />}
        Enviar
      </Button>
    </div>
  );
}

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

export const FormLogin = ({ setIsLogin }: Props) => {
  const {
    register,
    formState: { isValid, errors },
    setError,
  } = useForm<LoginType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });
  const [state, formAction] = useFormState<State, FormData>(signIn, null);
  const onClose = useModalStore.use.onClose();
  const setUser = useShopStore.use.setUser();

  useEffect(() => {
    if (!state) {
      return;
    }
    console.log(state);
    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<LoginType>, {
          message: error.message,
        });
      });
    }
    if (state.status === "success") {
      getProfile(state.user.id).then((profile) => {
        setUser(profile as ProfileType);
        onClose(MODAL_LOGIN);
      });
    }
  }, [state, setError, onClose, setUser]);

  return (
    <>
      <form action={formAction} className="flex flex-col space-y-3">
        <FormContent register={register} isValid={isValid} errors={errors} />
        <span className="my-2 border-b border-black" />
        <Button outline gradientDuoTone="pinkToOrange">
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
