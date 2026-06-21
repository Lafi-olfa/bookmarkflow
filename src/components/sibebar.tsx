import Home from "../assets/icon-home.svg";
import LogoDark from "../assets/logo-dark-theme.svg";
import Archive from "../assets/icon-archive.svg";
import Close from "../assets/icon-close.svg";

import LogoLight from "../assets/logo-light-theme.svg";
import { useTheme } from "../context/theme-context";
import Checktem from "./check-item";
import { useEffect, useState } from "react";
import type { Bookmark } from "./cards";
type SidebarProps = {
  onClose?: () => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
};
export default function Sidebar({
  onClose,
  selectedTags,
  onTagToggle,
}: SidebarProps) {
  const { theme } = useTheme();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadBookmarks = async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/bookmarks");
      const data = await res.json();
      if (isMounted) {
        setBookmarks(data);
        setIsLoading(false);
      }
    };

    void loadBookmarks();

    return () => {
      isMounted = false;
    };
  }, []);

  const tagCounts = bookmarks
    .flatMap((b) => b.tags)
    .reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  return (
    <div
      className={`relative min-h-screen w-64 px-4 py-3 ${theme === "dark" ? "bg-[#002E2D]" : "bg-white"}`}
    >
      <button onClick={onClose} className="absolute top-1 right-1 h-4 w-4">
        <img
          src={Close}
          alt="Menu"
          className="block h-5 w-5 lg:hidden dark:brightness-0 dark:contrast-100 dark:invert"
        />
      </button>
      <img
        src={`${theme === "dark" ? LogoDark : LogoLight}`}
        alt="Menu"
        className="h-auto w-auto dark:text-white"
      />
      <div className="flex flex-col justify-center gap-3">
        <div className="mt-5 flex items-center justify-start gap-2 rounded bg-gray-300 px-2 py-1 leading-[1.4] text-neutral-800 dark:bg-neutral-600 dark:text-white">
          <img
            src={Home}
            alt="Menu"
            className="h-5 w-5 text-neutral-900 dark:text-white"
          />
          <span>Home</span>
        </div>
        <div className="flex items-center justify-start gap-2 px-2 py-1 dark:text-neutral-100">
          <img
            src={Archive}
            alt="Menu"
            className="h-5 w-5 dark:brightness-0 dark:contrast-100 dark:invert"
          />
          <span>Archived</span>
        </div>
      </div>
      <span className="px-2 py-1 text-base leading-[1.4] dark:text-neutral-100">
        TAGS
      </span>
      {isLoading ? (
        <p className="px-2 py-1 text-sm dark:text-neutral-100">
          Loading tags...
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <Checktem
              key={tag}
              name={tag}
              count={String(count)}
              checked={selectedTags.includes(tag)}
              onChange={() => onTagToggle(tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
