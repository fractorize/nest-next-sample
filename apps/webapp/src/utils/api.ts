"use server";

const API_URL = process.env.NEXT_PUBLIC_NESTJS_URL;

export async function apiPOST(path: string, formData?: FormData) {
  try {
    return await fetch(`${API_URL}${path}`, {
      method: "POST",
      body: formData,
    });
  } catch (error: any) {
    throw error;
  }
}
