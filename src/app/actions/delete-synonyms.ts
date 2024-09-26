"use server";

import { revalidateTag } from "next/cache";

export const deleteSynonyms = async () => {
  const res = await fetch(`${process.env.FRONTEND_URL}/api`, {
    method: "DELETE",
  });

  if (!res.ok) return { success: false, message: "Failed to delete." };

  revalidateTag("synonyms");

  return { success: true, message: "Delete successfully." };
};
