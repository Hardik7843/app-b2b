/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// src/lib/fetchInstance.ts

export const fetchInstance = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = process.env.BASE_URL;

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    credentials: "include", // ✅ like withCredentials in axios
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  console.log("response", response);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || response.statusText);
  }

  return (await response.json()) as T;
};

const ALLOWED_METHODS = ["POST", "GET", "PUT", "DELETE"] as const;

export const fetchInstance2 = async <T>(
  url: string,
  options: RequestInit = {},
  method: (typeof ALLOWED_METHODS)[number]
): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    ...options,
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies
  });

  const jsonResponse = response.json();
  return jsonResponse as Promise<T>;
};
