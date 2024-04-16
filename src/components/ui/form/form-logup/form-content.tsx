import { AvatarsSelect } from "@/components/avatars-select/avatars-select";
import { Icon } from "@/components/icon/Icon";
import { InputText } from "@/components/inputs/InputText";
import { LogupType } from "@/types/logup";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type FormContentProps = {
  register: UseFormRegister<LogupType>;
  errors: FieldErrors<LogupType>;
};

export const FormContent = ({ register, errors }: FormContentProps) => {
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
      name: "full_name",
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
};
