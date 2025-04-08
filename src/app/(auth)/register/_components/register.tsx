"use client";

import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

const RegisterSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  fullname: yup.string().required("Email is required"),
});

interface IRegisterForm {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const initialValues: IRegisterForm = {
    username: "",
    fullname: "",
    email: "",
    password: "",
  };

  const onRegister = async (
    value: IRegisterForm,
    action: FormikHelpers<IRegisterForm>
  ) => {
    try {
      await axios.post("/auth", value);
      action.resetForm();
      toast.success("Registration successful!");
      router.push("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.error?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[90%] md:w-full md:max-w-[400px] bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Instagram
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Sign up to see photos and videos from your friends.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onRegister}
        >
          {(props: FormikProps<IRegisterForm>) => {
            const { errors, touched } = props;
            return (
              <Form className="flex flex-col">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-2 border rounded mb-3"
                />
                {touched.username && errors.username && (
                  <div className="text-red-500 text-sm">{errors.username}</div>
                )}
                <Field
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded mb-3"
                />
                {touched.username && errors.username && (
                  <div className="text-red-500 text-sm">{errors.username}</div>
                )}
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded mb-3"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border rounded mb-3"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded mt-3"
                >
                  Sign Up
                </button>
              </Form>
            );
          }}
        </Formik>
        <p className="text-xs text-gray-600 mt-4 text-center">
          By signing up, you agree to our{" "}
          <span className="text-blue-500 cursor-pointer">Terms</span>,{" "}
          <span className="text-blue-500 cursor-pointer">Data Policy</span> and{" "}
          <span className="text-blue-500 cursor-pointer">Cookies Policy</span>.
        </p>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-700">
            Have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}