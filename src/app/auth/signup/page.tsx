'use client';

import { useRouter } from 'next/navigation';
import type { z } from 'zod';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/features/core/components/ui/card';
import { Form } from '#/features/core/components/form';
import { SignUpSchema } from '#/features/users/schemas/auth';
import { authClient } from '#/features/core/auth/auth-client';

const SignUp = () => {
  const router = useRouter();

  const signUp = async (formData: z.infer<typeof SignUpSchema>) => {
    const { data } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
      },
      {
        onSuccess: () => {
          router.push('/auth/signin');
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );

    console.log(data);
  };

  return (
    <Card className="flex w-full max-w-md flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Create your account to apply for jobs and get matched with employers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          fields={[
            {
              label: 'First name',
              name: 'firstName',
              placeholder: 'Jan',
            },
            {
              label: 'Last name',
              name: 'lastName',
              placeholder: 'Kowalski',
            },
            {
              label: 'Email',
              name: 'email',
              type: 'email',
              placeholder: 'email@example.com',
            },
            {
              label: 'Password',
              name: 'password',
              type: 'password',
              placeholder: '********',
            },
            {
              label: 'Confirm password',
              name: 'confirmPassword',
              type: 'password',
              placeholder: '********',
            },
          ]}
          schema={SignUpSchema}
          onSubmit={signUp}
          submitText="Register"
        />
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <p className="text-muted-foreground text-sm">
          Lost your password?{' '}
          <Link href="/auth/recovery" className="text-primary hover:underline">
            Reset it!
          </Link>
        </p>
        <p className="text-muted-foreground text-sm">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Sign in!
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
