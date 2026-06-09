import { useState } from "react";
// import Icon from "../assets/favicon-frontend-mentor.png";
import Menu from "../assets/icon-menu-bookmark.svg";
import VisitCount from "../assets/icon-visit-count.svg";
import Pin from "../assets/icon-pin.svg";
import Visit from "../assets/icon-visit.svg";
import Copy from "../assets/icon-copy.svg";
import Edit from "../assets/icon-edit.svg";
import Archive from "../assets/icon-archive.svg";
import TagItem from "./tag-item";

type BookmarkItem = {
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: string;
};

type CardProps = {
  bookmark: BookmarkItem;
};

export default function Card({ bookmark }: CardProps) {
  console.log(bookmark);
  const {
    title,
    favicon,
    url,
    description,
    visitCount,
    tags,
    createdAt,
    lastVisited,
  } = bookmark;
  const domain = new URL(url).hostname.replace(/^www\./, "");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="mx-4 my-3 max-w-sm rounded-lg p-4 shadow-md dark:bg-[#002E2D]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img
            className="h-11 w-11 rounded-md border border-neutral-100"
            src={favicon}
            alt="logo"
          />
          <div>
            <p className="text-xl leading-[1.2] dark:text-white">{title}</p>
            <p className="py-1 text-xs leading-[1.4] dark:text-[#b1b9b9]">
              {domain}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={toggleMenu}
            className="cursor-pointer rounded-md border border-neutral-400 p-0.5"
          >
            <img
              className="h-6 w-6 text-neutral-800 dark:brightness-0 dark:contrast-100 dark:invert"
              src={Menu}
              alt="menu"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 z-50 h-48 w-50 rounded-md border border-teal-500 dark:bg-teal-600">
              <div className="mx-1 my-1 flex items-center justify-start gap-3 border border-amber-500 px-1 py-1">
                <img
                  className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                  src={Visit}
                  alt="visit"
                />
                <span className="text-sm leading-[1.4]">Visit</span>
              </div>
              <div className="mx-1 my-1 flex items-center justify-start gap-3 border border-amber-500 px-1 py-1">
                <img
                  className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                  src={Copy}
                  alt="copy"
                />
                <span className="text-sm leading-[1.4]">Copy URL</span>
              </div>
              <div className="mx-1 my-1 flex items-center justify-start gap-3 border border-amber-500 px-1 py-1">
                <img
                  className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                  src={Pin}
                  alt="pin"
                />
                <span className="text-sm leading-[1.4]">Pin</span>
              </div>
              <div className="mx-1 my-1 flex items-center justify-start gap-3 border border-amber-500 px-1 py-1">
                <img
                  className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                  src={Edit}
                  alt="edit"
                />
                <span className="text-sm leading-[1.4]">Edit</span>
              </div>
              <div className="mx-1 my-1 flex items-center justify-start gap-3 border border-amber-500 px-1 py-1">
                <img
                  className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                  src={Archive}
                  alt="archive"
                />
                <span className="text-sm leading-[1.4]">Archive</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="my-3 text-neutral-300" />

      {/* Content */}
      <p className="space-y-1 text-sm leading-normal dark:text-[#b1b9b9]">
        {/* Improve your front-end coding skills by building real projects. Solve
        real-world HTML, CSS and JavaScript challenges whilst working to
        professional designs. */}
        {description}
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <TagItem key={index} name={tag} />
        ))}
      </div>

      <hr className="-mx-4 my-3 text-neutral-300" />

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <img
              className="h-3 w-3 dark:brightness-0 dark:contrast-100 dark:invert"
              src={VisitCount}
              alt="Visit Count"
            />
            <span className="dark:text-[#b1b9b9]">{visitCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              className="h-3 w-3 dark:brightness-0 dark:contrast-100 dark:invert"
              src={VisitCount}
              alt=""
            />
            <span className="dark:text-[#b1b9b9]">
              {new Date(lastVisited).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img
              className="h-3 w-3 dark:brightness-0 dark:contrast-100 dark:invert"
              src={VisitCount}
              alt=""
            />
            <span className="dark:text-[#b1b9b9]">
              {" "}
              {new Date(createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
        {/* <img
          className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
          src={Pin}
          alt="pin"
        /> */}
        <TagItem name="Archived" />
      </div>
    </div>
  );
}
