type ReturnValue = "товаров" | "товар" | "товара";

export function getProductDeclension(count: number): ReturnValue {
  count = Math.abs(count);
  const count100 = count % 100;
  if (count100 >= 11 && count100 <= 14) {
    return "товаров";
  }
  const count10 = count % 10;
  if (count10 === 1) {
    return "товар";
  } else if (count10 >= 2 && count10 <= 4) {
    return "товара";
  } else {
    return "товаров";
  }
}
