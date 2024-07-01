"use client";

import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateUser } from "#/app/api/auth/signup/route";

export default function Page() {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateUser) => axios.post("/api/auth/signup", values),
    onSuccess: (data) => {
      if (data.status === 200) location.href = "/";
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
        id="first_name"
        name="first_name"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <Input
        label="Last Name"
        placeholder="Enter your last name"
        id="last_name"
        name="last_name"
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
