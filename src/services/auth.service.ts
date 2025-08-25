/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchInstance } from "@/lib/fetch";
import { LoginFormData } from "@/validators/auth.validator";
// import { cookies } from "next/headers";

// ✅ login action
export async function loginAction(data: LoginFormData) {
  const response = await fetchInstance<{
    data: any;
    message: string;
    success: boolean;
    sessionToken: string;
  }>("/auth/login", { body: JSON.stringify(data) }, "POST");

  return response;
}

export interface UserType {
  firstName: string;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  image: string | null;
  type: "USER" | "ADMIN" | null;
  acceptTerms: boolean | null;
  acceptPromos: boolean | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ get current user
export async function getProfileAction() {
  const response = await fetchInstance<{
    data: UserType;
    message: string;
    success: boolean;
    sesstionToken: string;
  }>("/auth/check", {}, "GET");

  console.log("getProfileAction -> response", response);
  return response;
}

export async function getAdminProfile() {
  // const cookieStore = await cookies();
  // const sessionToken = cookieStore.get("sessionToken")?.value || "";

  const response = await fetchInstance<{
    data: UserType;
    message: string;
    success: boolean;
    sesstionToken: string;
  }>(
    "/admin/check",
    {
      // headers: {
      //   authorization: `Bearer ${sessionToken}`,
      // },
      credentials: "include",
    },
    "GET"
  );

  console.log("getProfileAction -> response", response);
  return response;
}
