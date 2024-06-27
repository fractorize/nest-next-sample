"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_NESTJS_URL;

function getAccesToken() {
  return cookies().get("accessToken")?.value;
}

export async function apiPOST(path: string, formData?: FormData) {
  try {
    const accessToken = getAccesToken();
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error: any) {
    throw error;
  }
}

export async function apiGET(path: string, params?: any) {
  try {
    const accessToken = getAccesToken();
    const res = await fetch(`${API_URL}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error: any) {
    throw error;
  }
}
