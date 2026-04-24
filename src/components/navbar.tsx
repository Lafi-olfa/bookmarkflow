import Bars from "../assets/icon-menu-hamburger.svg";
import Search from "../assets/icon-search.svg";
import Add from "../assets/icon-add.svg";
import Avatar from "../assets/image-avatar.webp";
import Mode from "../assets/icon-dark-theme.svg";
import Light from "../assets/icon-light-theme.svg";
import { useTheme } from "../context/theme-context";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 dark:bg-neutral-800"
      style={{ minWidth: "220px" }}
    >
      {/* menu + search */}
      <div className="flex min-w-0 flex-1 items-center gap-3 dark:bg-sky-800">
        <button className="inline h-10 w-10 rounded-md border border-neutral-400 bg-white p-2.5 shadow-sm lg:hidden">
          <img
            src={Bars}
            alt="Menu"
            className="h-5 w-5 text-neutral-900 dark:text-white"
          />
        </button>

        <div className="flex w-full items-center gap-1 rounded-md border border-neutral-400 bg-white px-3 py-2 shadow-sm md:w-72 dark:bg-neutral-500">
          <img
            src={Search}
            alt="Search"
            className="h-5 w-5 text-neutral-800 opacity-60"
          />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full bg-transparent text-sm text-neutral-800 outline-none"
          />
        </div>
      </div>

      {/* add  */}
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center gap-2 rounded-md bg-teal-700 p-2 text-white shadow-2xs">
          <img src={Add} alt="Add" className="h-5 w-5 text-amber-50" />
          <span className="hidden md:inline">Add bookmark</span>
        </button>
        <img
          src={Avatar}
          alt="User avatar"
          className="h-10 w-10 rounded-full"
        />
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-2 rounded-md p-2 text-white shadow-2xs"
        >
          <img
            src={theme === "light" ? Mode : Light}
            alt="Add"
            className="h-5 w-5 text-amber-50"
          />
        </button>
      </div>
    </nav>
  );
}
