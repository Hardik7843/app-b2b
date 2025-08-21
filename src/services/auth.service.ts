"use server";

import { fetchInstance } from "@/lib/fetch";

// ✅ login action
export async function loginAction(email: string, password: string) {
  const response = await fetchInstance("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  console.log("response of loginAction:", response);
  return response;
}

// ✅ get current user
export async function getProfileAction() {
  return await fetchInstance("/auth/check", {
    method: "GET",
  });
}
