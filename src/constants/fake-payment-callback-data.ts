import { PaymentCallbackData } from "@/types/payment";

function generateRandomStatus(): "succeeded" | "cancelled" {
  const randomNumber = Math.floor(Math.random() * 2);

  return randomNumber === 0 ? "succeeded" : "cancelled";
}

export function generateFakePaymentCallbackData(id: number) {
  const fakePaymentCallbackData: PaymentCallbackData = {
    type: "notification", // Тип события
    event: "payment", // Тип события
    object: {
      id: "22d6d597-000f-5000-9000-145f6df21d6f", // Уникальный идентификатор платежа
      status: generateRandomStatus(), // Статус платежа
      amount: {
        value: "2000.00", // Сумма платежа
        currency: "RUB", // Валюта (рубли)
      },
      income_amount: {
        value: "1950.00", // Сумма, полученная после вычета комиссии
        currency: "RUB", // Валюта (рубли)
      },
      description: "Оплата заказа #12345", // Описание платежа
      recipient: {
        account_id: "123456", // Идентификатор аккаунта получателя
        gateway_id: "654321", // Идентификатор шлюза
      },
      payment_method: {
        type: "bank_card", // Тип платежного метода (например, банковская карта)
        id: "22d6d597-000f-5000-9000-145f6df21d6f", // Идентификатор платежного метода
        saved: true, // Сохранен ли метод оплаты
        title: "Bank card *4444", // Название метода оплаты
      },
      captured_at: Date(), // Дата и время захвата платежа
      created_at: Date(), // Дата и время создания платежа
      test: true, // Тестовый ли платеж
      refunded_amount: {
        value: "0.00", // Сумма возврата
        currency: "RUB", // Валюта (рубли)
      },
      paid: true, // Оплачен ли платеж
      refundable: true, // Возможен ли возврат
      metadata: {
        order_id: String(id), // Идентификатор заказа (из метаданных)
      },
      authorization_details: {
        rrn: "123456789012", // Референс-номер операции
        auth_code: "654321", // Код авторизации
      },
    },
  };
  return fakePaymentCallbackData;
}
