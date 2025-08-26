"use client";
import { masterImageBackgrounArt2 } from "@/app/static/imageImports";
// import { masterImageBackgrounArt1 } from "@/app/static/imageImports";
import Image from "next/image";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/validators/auth.validator";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { loginAction } from "@/services/auth.service";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true);
    console.log(data);

    const response = await loginAction(data);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-screen h-screen">
      <div className="p-5">
        {/* <div className="relative aspect-square w-full">
          <Image
            className="object-cover"
            src={masterImageBackgrounArt1}
            fill
            alt="ImageArt1"
          />
        </div> */}
        <div className="relative aspect-square w-full">
          <Image
            className="object-contain"
            src={masterImageBackgrounArt2}
            fill
            alt="ImageArt2"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-4"
        >
          <div className="">
            <label className="block mb-1 font-medium">Email</label>
            <Input
              type="text"
              {...register("email")}
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="">
            <label className="block mb-1 font-medium">Password</label>
            <Input
              type={showPassword ? `text` : `password`}
              {...register("password")}
              className="w-full p-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex space-x-1 items-center">
            <Checkbox
              defaultChecked={false}
              // checked={showPassword}
              onCheckedChange={(value) => setShowPassword(!!value)}
              id="showPassword"
            />

            <p>Show Password</p>
          </div>

          <Button
            id="loginButton"
            disabled={submitting}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
