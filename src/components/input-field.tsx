export default function InputField({
  fieldName,
  type,
  name,
}: {
  fieldName: string;
  type: string;
  name: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm leading-[1.4] dark:text-white">{fieldName}</span>
      <input
        type={type}
        name={name}
        id=""
        className="rounded-lg border p-2 shadow-sm dark:border-teal-500 dark:bg-teal-800"
      />
    </div>
  );
}
