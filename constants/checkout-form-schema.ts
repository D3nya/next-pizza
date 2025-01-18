import { z } from "zod";

/**
 * Схема валидации для формы оформления заказа.
 */
export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2-х символов" })
    .max(50, { message: "Имя должно содержать не более 50 символов" })
    .nonempty({ message: "Имя обязательно" }),

  lastName: z
    .string()
    .min(2, { message: "Фамилия должна содержать не менее 2-х символов" })
    .max(50, { message: "Фамилия должна содержать не более 50 символов" })
    .nonempty({ message: "Фамилия обязательна" }),

  email: z
    .string()
    .email({ message: "Введите корректную электронную почту" })
    .max(100, { message: "Электронная почта должна содержать не более 100 символов" })
    .nonempty({ message: "Электронная почта обязательна" }),

  phone: z
    .string()
    .regex(/^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/, {
      message: "Введите корректный номер телефона",
    })
    .min(5, { message: "Номер телефона слишком короткий" })
    .max(20, { message: "Номер телефона должен содержать не более 20 символов" })
    .nonempty({ message: "Номер телефона обязателен" }),

  address: z
    .string()
    .min(5, { message: "Введите корректный адрес" })
    .max(200, { message: "Адрес должен содержать не более 200 символов" })
    .nonempty({ message: "Адрес обязателен" }),

  comment: z.string().max(500, { message: "Комментарий должен содержать не более 500 символов" }).optional(),
});

/**
 * Тип данных для значений формы оформления заказа.
 * Автоматически выводится из схемы Zod.
 */
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
