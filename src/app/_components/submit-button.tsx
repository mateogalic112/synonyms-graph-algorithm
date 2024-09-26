"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";

interface Props {
  text: string;
  variant: ButtonProps["variant"];
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({
  text,
  variant,
  disabled,
  className = "",
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={variant}
      type="submit"
      aria-disabled={pending}
      disabled={disabled || pending}
      className={className}
    >
      {pending ? "Submiting..." : text}
    </Button>
  );
}
