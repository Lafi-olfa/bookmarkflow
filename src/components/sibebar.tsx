import Home from "../assets/icon-home.svg";
import LogoDark from "../assets/logo-dark-theme.svg";
import Archive from "../assets/icon-archive.svg";
import Close from "../assets/icon-close.svg";

import LogoLight from "../assets/logo-light-theme.svg";
import { useTheme } from "../context/theme-context";
import Checktem from "./check-item";
type SidebarProps = {
  onClose?: () => void;
};
export default function Sidebar({ onClose }: SidebarProps) {
  const { theme } = useTheme();

  return (
    <div className="relative h-96 w-64 px-4 py-3 dark:bg-[#002E2D]">
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
      <Checktem name="Home" count="3" />
    </div>
  );
}
