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
import { Button, Spinner } from "flowbite-react";
import { supabase } from "@/supabase/client";
import { ProfileType } from "@/types/profile";
import { useShopStore } from "@/store/shopStore";
import { AvatarsSelect, Icon, InputText } from "@/components";
import { LogupType } from "@/types/logup";

type FormContentProps = {
  register: UseFormRegister<LogupType>;
  errors: FieldErrors<LogupType>;
};

function FormContent({ register, errors }: FormContentProps) {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  const [avatar, setAvatar] = useState<{ gender: string; numImg: number }>({
    gender: "male",
    numImg: 1,
  });

  const fields = [
    {
      name: "email",
      label: "Correo electrónico",
      type: "email",
      icon: null,
      fullWidth: true,
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      icon: null,
    },
    {
      name: "phone",
      label: "Teléfono",
      type: "text",
      icon: null,
    },
    {
      name: "address",
      label: "Domicilio",
      type: "text",
      icon: null,
    },
    {
      name: "city",
      label: "Ciudad",
      type: "text",
      icon: null,
    },
    {
      name: "password",
      label: "Contraseña",
      type: showPassword ? "text" : "password",
      icon: (
        <Icon
          name={showPassword ? "EyeOff" : "Eye"}
          className="absolute right-2 top-[10px] z-30"
          onClick={() => setShowPassword(!showPassword)}
        />
      ),
    },
    {
      name: "confirmPassword",
      label: "Confirmar contraseña",
      type: showPassword ? "text" : "password",
      icon: (
        <Icon
          name={showPassword ? "EyeOff" : "Eye"}
          className="absolute right-1 top-[10px] z-30 "
          onClick={() => setShowPassword(!showPassword)}
        />
      ),
    },
  ];

  return (
    <div className="relative grid grid-cols-1 gap-3">
      <AvatarsSelect avatarSelected={avatar} setAvatarSelected={setAvatar} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <InputText
            key={field.name}
            name={field.name}
            label={field.label}
            errors={errors}
            register={register}
            type={field.type}
            icon={field.icon}
            fullWidth={field.fullWidth}
          />
        ))}
      </div>
      <input
        type="hidden"
        {...register("avatar_url")}
        value={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${avatar.gender}-${avatar.numImg}.png`}
      />

      <Button
        gradientMonochrome="info"
        type="submit"
        disabled={pending}
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

export const FormLogup = ({ setIsLogin }: Props) => {
  const {
    register,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<LogupType>({
    mode: "all",
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
      getProfile(state.user.id).then((profile) => {
        setUser({ ...profile, email: state.user.email } as ProfileType);
        onClose(MODAL_LOGIN);
      });
    }
  }, [state, setError, onClose, setUser, setFocus]);

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
