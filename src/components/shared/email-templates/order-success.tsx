import React from "react";

import { CartItemDTO } from "@/services/dto/cart.dto";

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

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "1.5" }}>
    <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Спасибо за покупку!</h1>
    <p style={{ marginBottom: "10px" }}>Ваш заказ №{orderId} оплачен.</p>
    <p style={{ marginBottom: "10px" }}>Список товаров:</p>
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
    <p style={{ marginBottom: "10px" }}>Спасибо за доверие! Ваш заказ будет обработан в ближайшее время.</p>
  </div>
);
