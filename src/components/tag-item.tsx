export default function TagItem({ name }: { name: string }) {
  return (
    <span className="rounded bg-gray-200 px-2 py-1 text-xs leading-[1.4] text-neutral-800 dark:bg-[#00706e] dark:text-[#B1B9B9]">
      {name}
    </span>
  );
}
