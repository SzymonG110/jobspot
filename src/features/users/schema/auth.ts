import { z } from 'zod';

export const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, 'Imię musi mieć co najmniej 3 znaki')
      .max(57, 'Imię jest za długie'),
    lastName: z
      .string()
      .min(3, 'Nazwisko musi mieć co najmniej 3 znaki')
      .max(35, 'Nazwisko jest za długie'),
    email: z.string().email('Podaj poprawny adres email'),
    password: z
      .string()
      .min(8, 'Hasło musi mieć co najmniej 8 znaków')
      .max(50, 'Hasło musi mieć maksymalnie 50 znaków'),
    confirmPassword: z.string().min(1, 'Potwierdzenie hasła jest wymagane'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Hasła muszą być takie same',
  });

export const SignInSchema = z.object({
  email: z.string().email('Podaj poprawny adres email'),
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email('Podaj poprawny adres email'),
});
