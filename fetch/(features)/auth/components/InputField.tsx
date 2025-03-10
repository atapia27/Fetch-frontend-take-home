import { twMerge } from "tailwind-merge";
import { inputBase } from "@/(features)/auth/styles/styles";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  type,
  id,
  value,
  onChange,
}: InputFieldProps) {
  // Styling
  const focusStyle = "focus:ring-blue-500";
  const inputStyle = twMerge(inputBase, focusStyle);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={inputStyle}
        required
      />
    </div>
  );
}
