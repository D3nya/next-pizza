"use client";

import { Controller, useFormContext } from "react-hook-form";
import { WhiteBlock } from "../white-block";
import { ErrorText } from "../error-text";
import { FormTextarea } from "../form/form-textarea";
import { AddressSuggestions } from "react-dadata";
import { Input } from "@/components/ui/input";
import { useId, useRef, useState } from "react";
import { ClearButton } from "../clear-button";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control, setValue } = useFormContext();
  const id = useId();
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const suggestionsRef = useRef<AddressSuggestions>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const token = process.env.NEXT_PUBLIC_DADATA_TOKEN || "";
  const name = "address";

  return (
    <WhiteBlock title="2. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange }, fieldState }) => (
            <div>
              <div className="relative">
                <AddressSuggestions
                  ref={suggestionsRef}
                  token={token}
                  onChange={(data) => {
                    onChange(data?.value);
                    setInputValue(data?.value);
                  }}
                  uid={id}
                  delay={200}
                  count={6}
                  customInput={Input}
                  containerClassName="relative"
                  inputProps={{
                    placeholder: "Введите адрес",
                    onChange: onChangeInput,
                  }}
                  suggestionsClassName="text-left rounded-md m-0 p-0 list-none absolute left-0 right-0 top-[calc(100%_+_8px)] bg-white z-10 overflow-hidden"
                  suggestionClassName="cursor-pointer text-left overflow-hidden w-full border-none px-3 py-2 text-sm bg-white hover:bg-slate-100"
                  hintClassName="bg-blue"
                  highlightClassName="text-primary bg-transparent"
                />
                {inputValue && (
                  <ClearButton
                    onClick={() => {
                      onChange(undefined);
                      setInputValue("");
                      setValue(name, "", { shouldValidate: true });
                      if (suggestionsRef.current) {
                        suggestionsRef.current.setInputValue("");
                      }
                    }}
                  />
                )}
              </div>
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </div>
          )}
        />

        <FormTextarea name="comment" className="text-base" placeholder="Комментарий к заказу" rows={5} />
      </div>
    </WhiteBlock>
  );
};
