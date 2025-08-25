/* eslint-disable @typescript-eslint/no-unused-vars */

// src/lib/fetchInstance.ts

const ALLOWED_METHODS = ["POST", "GET", "PUT", "DELETE"] as const;

export const fetchInstance = async <T>(
  url: string,
  options: RequestInit = {},
  method: (typeof ALLOWED_METHODS)[number]
): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    ...options,
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // Include cookies
  });

  const jsonResponse = response.json();
  return jsonResponse as Promise<T>;
};
