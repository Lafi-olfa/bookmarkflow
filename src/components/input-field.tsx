import { useTheme } from "../context/theme-context";

export default function InputField({
  fieldName,
  type,
  name,
  value,
  onChange,
}: {
  fieldName: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { theme } = useTheme();

  return (
    // <div className={`w-full max-w-md rounded-2xl px-2 py-4 ${theme === "dark" ? "bg-[#002E2D]" : "bg-white"}`}>

    <div className="flex flex-col gap-0.5">
      <span className="text-sm leading-[1.4] dark:text-white">{fieldName}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id=""
        // className="rounded-lg border p-2 shadow-sm dark:border-teal-500 dark:bg-teal-800"
        className={`rounded-lg border p-2 shadow-sm ${theme === "dark" ? "dark:border-teal-500 dark:bg-teal-800" : "border-neutral-400 bg-white"}`}
      />
    </div>
  );
}
