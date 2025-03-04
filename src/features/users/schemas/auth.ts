import { z } from 'zod';

const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, 'First name must be at least 3 characters')
      .max(57, 'First name is too long'),
    lastName: z
      .string()
      .min(3, 'Last name must be at least 3 characters')
      .max(35, 'Last name is too long'),
    email: z.string().email('Please provide a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password is too long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignInSchema = z.object({
  email: z.string().email('Email is not valid'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const ResetPasswordSchema = z.object({
  email: z.string().email('Email is not valid'),
});

export { SignUpSchema, SignInSchema, ResetPasswordSchema };
