import { generateFakePaymentCallbackData } from "@/constants/fake-payment-callback-data";
import { PaymentCallbackData } from "@/types/payment";
import axios from "axios";
import { randomUUID } from "crypto";

interface FakeData {
  orderId: number;
}

interface CreateProps extends FakeData {
  description: string;
  amount: number;
}

// Fake payment
export function createPayment(details: CreateProps) {
  const returnUrl = process.env.PAYMENT_CALLBACK_URL;
  const id = randomUUID();

  return { returnUrl, id, details };
}

export async function callbackPayment(details: FakeData) {
  const fakePaymentCallbackData = generateFakePaymentCallbackData(details.orderId);

  await axios.post<PaymentCallbackData>("http://localhost:3000/api/checkout/callback", fakePaymentCallbackData);
}
