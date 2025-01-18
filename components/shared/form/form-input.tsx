"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { Input } from "@/components/ui/input";
import { RequiredSymbol } from "../required-symbol";
import { HTMLInputTypeAttribute } from "react";
import { IMaskMixin } from "react-imask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const MaskedStyledInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input {...props} ref={inputRef as React.Ref<HTMLInputElement>} type="text" />
));

export const FormInput: React.FC<Props> = ({ className, name, label, required, type, placeholder, ...props }) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string | undefined;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        {type === "tel" ? (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <MaskedStyledInput
                className="h-12 text-md"
                ref={ref}
                onBlur={onBlur}
                value={value}
                onAccept={onChange}
                unmask={false}
                mask="+{7}(000)000-00-00"
                placeholder={placeholder}
              />
            )}
          />
        ) : (
          <Input placeholder={placeholder} type={type} className="h-12 text-md" {...register(name)} {...props} />
        )}
        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
