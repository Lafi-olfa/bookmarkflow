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
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm leading-[1.4] dark:text-white">{fieldName}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id=""
        className="rounded-lg border p-2 shadow-sm dark:border-teal-500 dark:bg-teal-800"
      />
    </div>
  );
}
