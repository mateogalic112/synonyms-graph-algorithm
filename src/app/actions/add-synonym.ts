"use server";

import { revalidateTag } from "next/cache";

interface FormState {
  success: boolean;
  message: string;
}

export const addSynonym = async (_: FormState, formData: FormData) => {
  const res = await fetch(`${process.env.FRONTEND_URL}/api`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return { success: false, message: "Failed to post." };

  revalidateTag("synonyms");

  return { success: true, message: "Posted successfully." };
};
