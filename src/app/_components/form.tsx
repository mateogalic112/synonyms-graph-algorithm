"use client";

import { Input } from "@/components/ui/input";
import { addSynonym } from "../actions/add-synonym";
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { SubmitButton } from "./submit-button";

const initialState = {
  success: false,
  message: "",
};

const Form = () => {
  const [state, formAction] = useFormState(addSynonym, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({ title: "Nice job!" });
    } else {
      toast({ title: "Ooops!", variant: "destructive" });
    }
    state.success = false;
  }, [state, toast]);

  return (
    <form className="flex flex-col gap-4 min-w-96" action={formAction}>
      <Input name="word" placeholder="Word" />
      <Input name="synonym" placeholder="Synonym" />
      <SubmitButton variant="destructive" text="Submit" />
    </form>
  );
};

export default Form;
