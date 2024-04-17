import { FloatingLabel } from "flowbite-react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  errors: FieldErrors;
  icon: React.ReactNode;
  register: any;
  type: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
};

export const InputText = ({
  name,
  label,
  errors,
  icon,
  register,
  type,
  fullWidth = false,
  autoFocus,
}: Props) => {
  return (
    <div className={`relative ${fullWidth && "col-span-2"} mb-1`}>
      <FloatingLabel
        autoFocus={autoFocus}
        type={type}
        variant="outlined"
        label={label}
        sizing="sm"
        color={!errors[name] ? "default" : "error"}
        className="tracking-wider dark:bg-gray-700"
        {...register(name)}
      />
      {icon}
      <span className="absolute -bottom-2 left-1 text-[10px] font-semibold text-red-500">
        <ErrorMessage name={name} errors={errors} />
      </span>
    </div>
  );
};
