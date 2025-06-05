"use client";

import { useFormContext } from "react-hook-form";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form/form-textarea";
import { FormInput } from "../form/form-input";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { register } = useFormContext();

  return (
    <WhiteBlock title="2. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput
          type="text"
          className="text-base"
          placeholder="Введите адрес"
          label="Адрес"
          {...register("address")}
        />

        <FormTextarea name="comment" className="text-base" placeholder="Комментарий к заказу" label="Адрес" rows={5} />
      </div>
    </WhiteBlock>
  );
};
