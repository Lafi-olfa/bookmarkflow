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
    <div className="flex flex-col bg-red-500">
      <span>{fieldName}</span>
      <input type={type} name={name} id="" />
    </div>
  );
}
