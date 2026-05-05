import Sort from "../assets/icon-sort.svg";

export default function BookmarkHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-xl leading-[1.2] dark:text-white">
        <h2>All bookmarks</h2>
      </div>
      <div className="flex cursor-pointer gap-3 rounded-md border px-2 py-1 dark:border-[#004241] dark:bg-[#002E2D]">
        <img
          src={Sort}
          alt="Menu"
          className="h-5 w-5 dark:brightness-0 dark:contrast-100 dark:invert"
        />
        <span className="dark:text-white">Sort by</span>
      </div>
    </div>
  );
}
