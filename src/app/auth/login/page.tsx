"use client";

import { useFormik } from "formik";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "#/app/api/auth/login/route";

export default function Page() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (values: LoginUser) => axios.post("/api/auth/login", values),
    onSuccess: (data) => {
      if (data.status === 200) router.push("/");
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
