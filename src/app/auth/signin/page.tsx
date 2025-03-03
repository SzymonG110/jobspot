'use client';

// import { useRouter } from 'next/navigation';
// import type { z } from 'zod';
import Link from 'next/link';

import { Form } from '#/features/core/components/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/features/core/components/ui/card';
import { SignInSchema } from '#/features/users/schema/auth';

const SignIn = () => {
  //   const router = useRouter();

  const signIn = async () => {};

  return (
    <Card className="flex w-full max-w-md flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Sign in to continue to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form
          fields={[
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
          ]}
          schema={SignInSchema}
          onSubmit={signIn}
          submitText="Sign in"
        />
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <p className="text-muted-foreground text-sm">
          Lost your password?{' '}
          <Link href="/auth/recovery" className="text-primary hover:underline">
            Reset it
          </Link>
        </p>
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
