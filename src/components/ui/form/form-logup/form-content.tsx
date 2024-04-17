import { AvatarsSelect } from "@/components/avatars-select/avatars-select";
import { Icon } from "@/components/icon/Icon";
import { InputText } from "@/components/inputs/InputText";
import { LogupType } from "@/types";
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

  return (
    <div className="relative m-5 flex flex-col gap-3">
      <div className="max-h-[520px] overflow-y-auto">
        <div className="flex flex-col sm:flex-row">
          <AvatarsSelect
            avatarSelected={avatar}
            setAvatarSelected={setAvatar}
          />
          <div className="mt-2 flex h-32 w-full flex-col justify-around self-end sm:pl-5">
            <InputText
              name="email"
              label="Correo electrónico"
              errors={errors}
              register={register}
              type="email"
              icon={null}
              fullWidth
              autoFocus
            />
            <InputText
              name="full_name"
              label="Nombre"
              errors={errors}
              register={register}
              type="text"
              icon={null}
              fullWidth
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-2 sm:mt-2 sm:grid-cols-3 sm:gap-x-2">
          <InputText
            name="phone"
            label="Teléfono"
            errors={errors}
            register={register}
            type="text"
            icon={null}
          />
          <InputText
            name="address"
            label="Dirección"
            errors={errors}
            register={register}
            type="text"
            icon={null}
          />
          <InputText
            name="city"
            label="Ciudad"
            errors={errors}
            register={register}
            type="text"
            icon={null}
          />
        </div>
        <div className="mt-2 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:space-x-2">
          <InputText
            errors={errors}
            register={register}
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            icon=<Icon
              name={showPassword ? "EyeOff" : "Eye"}
              className="absolute right-2 top-[10px] z-30"
              onClick={() => setShowPassword(!showPassword)}
            />
          />
          <InputText
            errors={errors}
            register={register}
            name="confirmPassword"
            label="Confirmar contraseña"
            type={showPassword ? "text" : "password"}
            icon=<Icon
              name={showPassword ? "EyeOff" : "Eye"}
              className="absolute right-2 top-[10px] z-30"
              onClick={() => setShowPassword(!showPassword)}
            />
          />
        </div>
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
