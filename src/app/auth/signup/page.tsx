"use client";

import { Button, Input } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { signUp } from "#/features/auth/actions/signUp";
import { CreateUser } from "#/features/auth/schemas/signup";

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateUser) => signUp(values),
    onSuccess: async (data) => {
      if (data.ok) {
        await queryClient.invalidateQueries({
          queryKey: ["userSession"],
        });
        router.push("/");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    onSubmit: async (values) => {
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
        label="First Name"
        placeholder="Enter your first name"
        id="firstName"
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <Input
        label="Last Name"
        placeholder="Enter your last name"
        id="lastName"
        name="lastName"
        onChange={formik.handleChange}
        value={formik.values.lastName}
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
