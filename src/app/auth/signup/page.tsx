"use client";

import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { CreateUser } from "#/app/api/auth/signup/route";

export default function Page() {
  const { mutate, isPending: is_pending } = useMutation({
    mutationFn: (values: CreateUser) => axios.post("/api/auth/signup", values),
    onSuccess: (data) => {
      if (data.status === 200) {
        revalidatePath("/");
        location.href = "/";
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
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
      />

      <Input
        label="First Name"
        placeholder="Enter your first name"
        id="first_name"
        name="first_name"
        onChange={formik.handleChange}
        value={formik.values.first_name}
      />

      <Input
        label="Last Name"
        placeholder="Enter your last name"
        id="last_name"
        name="last_name"
        onChange={formik.handleChange}
        value={formik.values.last_name}
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

      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
}
