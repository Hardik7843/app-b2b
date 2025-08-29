"use server";

import { put, del } from "@vercel/blob"; // Vercel Blob SDK

// Upload an image and return the URL
export async function uploadImage(file: File): Promise<string> {
  const blob = await put(file.name, file, {
    access: "public", // or private if you want signed URLs later
  });

  return blob.url;
}

// Delete an image by its URL
export async function deleteImage(url: string): Promise<void> {
  await del(url);
}
