import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { buttonBase } from "@/(features)/auth/styles/styles";

interface SocialLoginButtonProps {
  icon: ReactNode;
  label: string;
}

export default function SocialLoginButton({
  icon,
  label,
}: SocialLoginButtonProps) {

    /** --- Styling --- **/
  const buttonVariant =
    "flex w-full items-center justify-center hover:bg-gray-100 ";
  const buttonStyle = twMerge(buttonBase, buttonVariant);

  return (
    <button className={buttonStyle}>
      {icon}
      <span className="sr-only">{label}</span>
    </button>
  );
}
