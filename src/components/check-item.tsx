interface CheckItemsProps {
  name: string;
  count: string;
  checked: boolean;
  onChange: () => void;
}
export default function Checktem({
  name,
  count,
  checked,
  onChange,
}: CheckItemsProps) {
  return (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name=""
          id=""
        />
        <span className="text-base leading-[1.4] dark:text-neutral-100">
          {name}
        </span>
      </div>
      <div className="flex w-fit items-center rounded-full border border-neutral-200 px-2 py-0.5 dark:border-[#004241] dark:bg-[#002E2D]">
        <p className="font-manrope w-fit text-xs leading-[1.4em] font-medium text-[#4c5c59] dark:text-[#FFF]">
          {count}
        </p>
      </div>
    </div>
  );
}
