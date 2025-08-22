/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchInstance, fetchInstance2 } from "@/lib/fetch";
import { LoginFormData } from "@/validators/auth.validator";

// ✅ login action
export async function loginAction(data: LoginFormData) {
  const response = await fetchInstance2<{
    data: any;
    message: string;
    success: boolean;
    sessionToken: string;
  }>("/auth/login", { body: JSON.stringify(data) }, "POST");

  return response;
}

// ✅ get current user
export async function getProfileAction() {
  return await fetchInstance("/auth/check", {
    method: "GET",
  });
}
