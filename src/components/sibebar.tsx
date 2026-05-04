import Home from "../assets/icon-home.svg";
import LogoDark from "../assets/logo-dark-theme.svg";
import Archive from "../assets/icon-archive.svg";
import Close from "../assets/icon-close.svg";

import LogoLight from "../assets/logo-light-theme.svg";
import { useTheme } from "../context/theme-context";
export default function Sidebar() {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className="relative h-96 w-72 px-4 py-3 dark:bg-neutral-800">
      <button className="absolute top-1 right-1 h-4 w-4">
        <img
          src={Close}
          alt="Menu"
          className="h-5 w-5 text-neutral-900 dark:text-white"
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
        <div className="flex items-center justify-start gap-2 px-2 py-1 text-neutral-800 dark:text-neutral-100">
          <img src={Archive} alt="Menu" className="h-5 w-5" />
          <span>Archived</span>
        </div>
      </div>
      <span className="px-2 py-1 text-base leading-[1.4] text-neutral-800 dark:text-neutral-100">
        TAGS
      </span>
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex gap-2">
          <input type="checkbox" name="" id="" />
          <span className="text-base leading-[1.4] text-neutral-800 dark:text-neutral-100">
            Home
          </span>
        </div>
        <span className="rounded-3xl border bg-gray-300 px-2 py-1 text-xs leading-[1.4] text-neutral-800 dark:border-neutral-300 dark:bg-neutral-600 dark:text-white">
          1
        </span>
      </div>
    </div>
  );
}
