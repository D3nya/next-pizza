"use client";

import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { ClearButton } from "../clear-button";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-32 pr-8 text-md resize-none" maxLength={500} {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </div>
  );
};
