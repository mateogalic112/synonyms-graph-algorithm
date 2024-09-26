"use server";

import { revalidateTag } from "next/cache";

interface FormState {
  success: boolean;
  message: string;
}

export const addSynonym = async (_: FormState, formData: FormData) => {
  const res = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return { success: false, message: "Failed to post." };

  revalidateTag("synonyms");

  return { success: true, message: "Posted successfully." };
};
