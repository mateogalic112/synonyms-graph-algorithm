"use client";

import { deleteSynonyms } from "../actions/delete-synonyms";
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { SubmitButton } from "./submit-button";

const initialState = {
  success: false,
  message: "",
};

export default function Reset() {
  const [state, formAction] = useFormState(deleteSynonyms, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({ title: "Reset!" });
    } else {
      toast({ title: "Ooops reset!", variant: "destructive" });
    }
    state.success = false;
  }, [state, toast]);

  return (
    <form action={formAction}>
      <SubmitButton variant="default" text="Reset Words" />
    </form>
  );
}
