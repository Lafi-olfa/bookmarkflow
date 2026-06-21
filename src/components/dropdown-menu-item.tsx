// menu-dropdown-item.tsx
type MenuDropdownItemProps = {
  src: string;
  label: string;
  onClick?: () => void;
};

export default function MenuDropdownItem({
  src,
  label,
  onClick,
}: MenuDropdownItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-46 cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-[#003a39]"
    >
      <img
        className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
        src={src}
        alt={label}
      />
      <p className="font-manrope w-full text-sm leading-[1.4em] font-semibold text-[#B1B9B9]">
        {label}
      </p>
    </div>
  );
}
