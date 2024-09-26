"use client";

import { Button } from "@/components/ui/button";
import { deleteSynonyms } from "../actions/delete-synonyms";
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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
      <Button>Clear Words</Button>
    </form>
  );
}
