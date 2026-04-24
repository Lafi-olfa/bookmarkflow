import Sort from "../assets/icon-sort.svg";

export default function BookmarkHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-xl leading-[1.2] text-neutral-900 dark:bg-red-900 dark:text-white">
        <h2>All bookmarks</h2>
      </div>
      <div className="flex cursor-pointer gap-3 rounded-md border border-neutral-400 bg-white px-2 py-1 dark:bg-neutral-900">
        <img
          src={Sort}
          alt="Menu"
          className="h-5 w-5 text-neutral-900 dark:text-white"
        />
        <span className="text-neutral-900">Sort by</span>
      </div>
    </div>
  );
}
