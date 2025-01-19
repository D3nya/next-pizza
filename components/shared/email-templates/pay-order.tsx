import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => (
  <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "1.5" }}>
    <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Заказ #{orderId}</h1>
    <p style={{ marginBottom: "10px" }}>Добрый день!</p>
    <p style={{ marginBottom: "10px" }}>Спасибо за ваш заказ. Для его оплаты перейдите по ссылке ниже.</p>
    <p style={{ marginBottom: "10px" }}>
      Сумма к оплате: <b>{totalAmount} ₽</b>
    </p>
    <p style={{ marginBottom: "10px" }}>
      <a href={paymentUrl} style={{ color: "#007bff", textDecoration: "underline" }}>
        Оплатить заказ
      </a>
    </p>
    <p style={{ marginBottom: "10px" }}>
      Если у вас возникнут вопросы, свяжитесь с нами по адресу support@example.com или по телефону +1234567890.
    </p>
    <p style={{ marginBottom: "10px" }}>С уважением,</p>
    <p style={{ marginBottom: "0" }}>Команда Next Pizza</p>
  </div>
);
