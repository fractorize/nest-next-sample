"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_NESTJS_URL;

export async function apiPOST(path: string, formData?: FormData) {
  try {
    const accessToken = cookies().get("accessToken");
    return await fetch(`${API_URL}${path}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error: any) {
    throw error;
  }
}
