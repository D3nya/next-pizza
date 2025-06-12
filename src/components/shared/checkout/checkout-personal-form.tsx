import React from "react";

import { FormInput } from "../form/form-input";
import { WhiteBlock } from "../white-block";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput type="text" name="firstName" className="text-base" placeholder="Имя" label="Имя" />
        <FormInput type="text" name="lastName" className="text-base" placeholder="Фамилия" label="Фамилия" />
        <FormInput type="email" name="email" className="text-base" placeholder="E-Mail" label="E-Mail" />
        <FormInput type="tel" name="phone" className="text-base" placeholder="Телефон" label="Телефон" />
      </div>
    </WhiteBlock>
  );
};
