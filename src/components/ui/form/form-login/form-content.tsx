import { Icon } from "@/components/icon/Icon";
import { InputText } from "@/components/inputs/InputText";
import { LoginType } from "@/types";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export const FormContent = ({
  register,
  errors,
}: {
  register: UseFormRegister<LoginType>;
  errors: FieldErrors<LoginType>;
}) => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative m-5 flex flex-col gap-3">
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
        disabled={pending}
        className="mt-2"
      >
        {pending && <Spinner size="sm" className="mr-4" />}
        Enviar
      </Button>
    </div>
  );
};
