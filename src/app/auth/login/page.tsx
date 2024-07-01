"use client";

import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "#/app/api/auth/login/route";
import { revalidatePath } from "next/cache";

export default function Page() {
  const { mutate, isPending: is_pending } = useMutation({
    mutationFn: (values: LoginUser) => axios.post("/api/auth/login", values),
    onSuccess: (data) => {
      if (data.status === 200) location.href = "/";
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

      <Button type="submit" color="primary" isDisabled={is_pending}>
        Submit
      </Button>
    </form>
  );
}
