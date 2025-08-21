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
