import { useState } from "react";
import Icon from "../assets/favicon-frontend-mentor.png";
import Menu from "../assets/icon-menu-bookmark.svg";
import VisitCount from "../assets/icon-visit-count.svg";
import Pin from "../assets/icon-pin.svg";
import Visit from "../assets/icon-visit.svg";
import Copy from "../assets/icon-copy.svg";
import Edit from "../assets/icon-edit.svg";
import Archive from "../assets/icon-archive.svg";

export default function Cards() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="mx-4 my-3 max-w-sm rounded-lg p-4 shadow-md dark:bg-teal-600 dark:text-neutral-200">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img
            className="h-11 w-11 rounded-md border border-neutral-100"
            src={Icon}
            alt="logo"
          />
          <div>
            <p className="text-xl leading-[1.2] text-neutral-900 dark:text-white">
              Frontend Mentor
            </p>
            <p className="py-1 text-xs leading-[1.4] text-gray-800 dark:text-neutral-100">
              frontendmentor.io
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
      <p className="space-y-1 text-sm leading-normal text-neutral-800 dark:text-neutral-100">
        Improve your front-end coding skills by building real projects. Solve
        real-world HTML, CSS and JavaScript challenges whilst working to
        professional designs.
      </p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded bg-gray-200 px-2 py-1 text-xs leading-[1.4] text-neutral-800 dark:bg-teal-500 dark:text-neutral-100">
          Practice
        </span>
        <span className="rounded bg-gray-200 px-2 py-1 text-xs leading-[1.4] text-neutral-800 dark:bg-teal-500 dark:text-neutral-100">
          Learning
        </span>
        <span className="rounded bg-gray-200 px-2 py-1 text-xs leading-[1.4] text-neutral-800 dark:bg-teal-500 dark:text-neutral-100">
          Community
        </span>
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
            <span className="dark:text-neutral-100">47</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              className="h-3 w-3 dark:brightness-0 dark:contrast-100 dark:invert"
              src={VisitCount}
              alt=""
            />
            <span className="dark:text-neutral-100">23 Sep</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              className="h-3 w-3 dark:brightness-0 dark:contrast-100 dark:invert"
              src={VisitCount}
              alt=""
            />
            <span className="dark:text-neutral-100">15 Jan</span>
          </div>
        </div>
        <img
          className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
          src={Pin}
          alt="pin"
        />
      </div>
    </div>
  );
}
