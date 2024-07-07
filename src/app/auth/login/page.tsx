"use client";

import { Button, Input } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { signIn } from "#/features/auth/actions/signIn";
import { SignInUser } from "#/features/auth/schemas/login";

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: SignInUser) => signIn(values),
    onSuccess: async (data) => {
      if (data.ok) {
        await queryClient.refetchQueries({
          queryKey: ["userSession"],
        });
        router.push("/");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex gap-3 flex-col *:w-80">
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        id="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        autoFocus
      />

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        id="password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <Button type="submit" color="primary" isDisabled={isPending}>
        Submit
      </Button>
    </form>
  );
}
