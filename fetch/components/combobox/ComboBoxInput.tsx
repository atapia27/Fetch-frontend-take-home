interface ComboBoxInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export default function ComboBoxInput({
  value,
  onChange,
  onFocus,
  placeholder,
}: ComboBoxInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus} 
      placeholder={placeholder}
      className="w-full rounded-md border p-2"
    />
  );
}
