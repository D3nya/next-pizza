import { z } from "zod";

// Password schema with minimum length of 8 characters
export const passwordSchema = z
  .string()
  .min(8, { message: "Пароль должен содержать не менее 8 символов" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "Пароль должен содержать буквы, цифры и специальные символы",
  });

// Login form schema
export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введите корректную почту" }).min(1, { message: "Почта не может быть пустой" }),
  password: passwordSchema,
});

// Registration form schema
export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(4, { message: "Имя и фамилия должны содержать не менее 4 символов" })
        .regex(/^[a-zA-ZА-Яа-яЁё]+(?:\s[a-zA-ZА-Яа-яЁё]+)*$/, {
          message: "Имя и фамилия должны содержать только буквы и пробелы",
        }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

// Type definitions
export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
