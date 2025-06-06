"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

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

  const value = watch(name) as string;
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      <p className="mb-2 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-32 resize-none pr-8 text-base" maxLength={500} {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <p className="mt-2 text-sm text-red-500">{errorText}</p>}
    </div>
  );
};
