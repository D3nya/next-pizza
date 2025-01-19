import { CartItemDTO } from "@/services/dto/cart.dto";
import React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

const calculateTotal = (items: CartItemDTO[]) => {
  return items.reduce((total, item) => {
    const price = item.productItem?.price || 0;
    const count = item.totalCount || 0;
    return total + price * count;
  }, 0);
};

export const OrderFailedTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "1.5" }}>
    <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Извините, заказ #{orderId} не был оплачен.</h1>
    <p style={{ marginBottom: "10px" }}>
      К сожалению, возникла проблема с оплатой вашего заказа. Пожалуйста, попробуйте снова или свяжитесь с нами для
      решения проблемы.
    </p>
    <hr style={{ borderColor: "#ccc", margin: "10px 0" }} />
    {items && items.length > 0 ? (
      <ul style={{ listStyleType: "disc", marginLeft: "20px", marginBottom: "10px" }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "5px" }}>
            {item.productItem && item.productItem.product ? item.productItem.product.name : "Unknown Product"} |
            {item.productItem && item.productItem.price ? item.productItem.price : "N/A"} ₽ x
            {item.totalCount ? item.totalCount : 0} шт. =
            {item.productItem && item.productItem.price && item.totalCount
              ? item.productItem.price * item.totalCount
              : "N/A"}{" "}
            ₽
          </li>
        ))}
      </ul>
    ) : (
      <p style={{ fontSize: "14px" }}>No items in your order.</p>
    )}
    <p style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>Итого: {calculateTotal(items)} ₽</p>
    <p style={{ marginBottom: "10px" }}>
      Пожалуйста, попробуйте оформить заказ снова или свяжитесь с нашей службой поддержки для помощи.
    </p>
    <p style={{ marginBottom: "10px" }}>С уважением,</p>
    <p style={{ marginBottom: "0" }}>Команда Next Pizza</p>
  </div>
);
