import Bars from "../assets/icon-menu-hamburger.svg";
import Search from "../assets/icon-search.svg";
import Add from "../assets/icon-add.svg";
import Avatar from "../assets/image-avatar.webp";
import Mode from "../assets/icon-dark-theme.svg";
import Light from "../assets/icon-light-theme.svg";
import Theme from "../assets/icon-theme.svg";
import Logout from "../assets/icon-logout.svg";
import { useTheme } from "../context/theme-context";
import { useState } from "react";
import AddBookmark from "./add-bookmark";

type NavbarProps = {
  searchQuery: string;
  onSearch: (value: string) => void;
  onMenuClick: () => void;
};

export default function Navbar({
  searchQuery,
  onSearch,
  onMenuClick,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 dark:bg-[#002E2D]"
      style={{ minWidth: "220px" }}
    >
      {/* menu + search */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="inline h-10 w-10 rounded-md border border-neutral-400 bg-white p-2.5 shadow-sm lg:hidden"
        >
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
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full bg-transparent text-sm text-neutral-800 outline-none"
          />
        </div>
      </div>

      {/* add  */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-teal-700 p-2 text-white shadow-2xs"
        >
          <img
            src={Add}
            alt="Add"
            className="w- h-5 dark:brightness-0 dark:contrast-100 dark:invert"
          />
          <span className="hidden md:inline">Add bookmark</span>
        </button>
        {isAddModalOpen && (
          <AddBookmark onClose={() => setIsAddModalOpen(false)} />
        )}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="cursor-pointer rounded-md border-none p-0.5"
          >
            <img
              src={Avatar}
              alt="User avatar"
              className="h-10 w-10 rounded-full"
            />
          </button>
          {isMenuOpen && (
            <>
              {/* background color fix  */}
              <div
                className={`absolute right-0 z-50 w-56 flex-col rounded-lg border border-[#004241] p-2 shadow-md ${theme === "dark" ? "bg-[#002E2D]" : "bg-white"}`}
              >
                <div className="flex items-center gap-3 border-b border-b-[#E9EAEB] p-2">
                  <img
                    className="h-10 w-10 shrink-0 rounded-full"
                    src={Avatar}
                    alt="avatar"
                  />
                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-semibold ${theme === "dark" ? "text-white" : "text-[#051513]"}`}
                    >
                      Emily Carter
                    </p>
                    <p className="truncate text-sm font-medium text-[#4C5C59] dark:text-[#B1B9B9]">
                      emily101@email.com
                    </p>
                  </div>
                </div>
                {/* light/dark */}
                <div className="flex items-center justify-between gap-3 border-b border-b-[#E9EAEB] p-2">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-5 w-5 shrink-0 "
                      src={Theme}
                      alt="theme"
                    />
                    <p
                      className={`font-manrope text-sm font-semibold ${theme === "dark" ? "text-neutral-100" : "text-[#051513]"}`}
                    >
                      Theme
                    </p>
                  </div>

                  {/* Toggle light/dark */}
                  <div className="flex items-center overflow-hidden rounded-md border border-[#D5D7DA]">
                    <button
                      onClick={() => theme !== "light" && toggleTheme()}
                      className={`p-1.5 ${theme === "light" ? "bg-white shadow-sm" : "bg-transparent"}`}
                    >
                      <img
                        src={Light}
                        alt="light"
                        className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                      />
                    </button>
                    <button
                      onClick={() => theme !== "dark" && toggleTheme()}
                      className={`p-1.5 ${theme === "dark" ? "bg-white/10 shadow-sm" : "bg-transparent"}`}
                    >
                      <img
                        src={Mode}
                        alt="dark"
                        className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                      />
                    </button>
                  </div>
                </div>
                {/* logout */}
                <div
                  className="flex cursor-pointer items-center gap-3 p-2"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/sign-in"; // 👈 redirect
                    setIsMenuOpen(false);
                  }}
                >
                  <img
                    className="h-5 w-5 shrink-0 rounded-full dark:brightness-0 dark:contrast-100 dark:invert"
                    src={Logout}
                    alt="avatar"
                  />
                  <p
                    className={`font-manrope text-sm font-semibold ${theme === "dark" ? "text-neutral-100" : "text-[#051513]"}`}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
