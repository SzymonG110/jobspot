"use client";

import { useFormik } from "formik";
import { Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CreateUser } from "#/app/api/auth/signup/route";

export default function Page() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (values: CreateUser) => axios.post("/api/auth/signup", values),
    onSuccess: (data) => {
      if (data.status === 200) router.push("/");
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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={formik.handleSubmit} className="flex gap-3 flex-col">
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
