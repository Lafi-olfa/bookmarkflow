import { useState } from "react";
// import Icon from "../assets/favicon-frontend-mentor.png";
import Menu from "../assets/icon-menu-bookmark.svg";
import VisitCount from "../assets/icon-visit-count.svg";
import Pin from "../assets/icon-pin.svg";
import Unpin from "../assets/icon-unpin.svg";
import Visit from "../assets/icon-visit.svg";
import Copy from "../assets/icon-copy.svg";
import Edit from "../assets/icon-edit.svg";
import Archive from "../assets/icon-archive.svg";
import Unarchive from "../assets/icon-unarchive.svg";
import TagItem from "./tag-item";
import Modal from "./modal";
import EditBookmark from "./edit-bookmark";
import { useTheme } from "../context/theme-context";
import DropdownMenuItem from "./dropdown-menu-item";

type BookmarkItem = {
  _id: string;
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
  onArchive: (id: string, isArchived: boolean) => void;
  fetchBookmarks: () => void;
};

export default function Card({
  bookmark,
  onArchive,
  fetchBookmarks,
}: CardProps) {
  const {
    _id,
    title,
    favicon,
    url,
    description,
    visitCount,
    tags,
    createdAt,
    lastVisited,
    pinned,
    isArchived,
  } = bookmark;
  const domain = new URL(url).hostname.replace(/^www\./, "");
  const modalData = isArchived
    ? {
        title: "Unarchive bookmark",
        description: "Move this bookmark back to your active list?",
        confirmText: "Unarchive",
      }
    : {
        title: "Archive bookmark",
        description: "Are you sure you want to archive this bookmark?",
        confirmText: "Archive",
      };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
    setIsMenuOpen(false);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };
  const { theme } = useTheme();

  return (
    <div className="mx-4 my-3 flex h-auto w-auto max-w-sm flex-col rounded-lg p-4 shadow-md dark:bg-[#002E2D]">
      {" "}
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
            <div
              className={`absolute right-0 z-50 w-56 flex-col rounded-lg border border-[#004241] p-2 shadow-md ${theme === "dark" ? "bg-[#002E2D]" : "bg-white"}`}
            >
              <DropdownMenuItem
                src={Visit}
                label="Visit"
                onClick={() => window.open(url, "_blank")}
              />
              <DropdownMenuItem
                src={Copy}
                label={copied ? "Copied!" : "Copy URL"}
                onClick={handleCopy}
              />
              <DropdownMenuItem
                src={pinned ? Unpin : Pin}
                label={pinned ? "Unpin" : "Pin"}
              />
              <DropdownMenuItem
                src={Edit}
                label="Edit"
                onClick={() => {
                  setIsEditModalOpen(true);
                  setIsMenuOpen(false);
                }}
              />
              <DropdownMenuItem
                src={isArchived ? Unarchive : Archive}
                label={isArchived ? "Unarchive" : "Archive"}
                onClick={openArchiveModal}
              />
            </div>
          )}
          {isEditModalOpen && (
            <EditBookmark
              bookmark={bookmark}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={fetchBookmarks}
            />
          )}
          {isArchiveModalOpen && (
            <Modal
              id={_id}
              title={modalData.title}
              description={modalData.description}
              confirmText={modalData.confirmText}
              onClose={() => setIsArchiveModalOpen(false)}
              onConfirm={async () => {
                await onArchive(_id, isArchived);
                setIsArchiveModalOpen(false);
              }}
            />
          )}
        </div>
      </div>
      <hr className="my-3 text-neutral-300" />
      {/* Content */}
      <p className="space-y-1 text-sm leading-normal dark:text-[#b1b9b9]">
        {description}
      </p>
      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <TagItem key={index} name={tag} />
        ))}
      </div>
      {/* Footer */}
      <div className="mt-auto">
        <hr className="-mx-4 my-3 text-neutral-300" />
        <div className="flex items-center justify-between text-xs text-gray-600">
          {" "}
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
                {!lastVisited
                  ? "Never"
                  : new Date(lastVisited).toLocaleDateString("en-GB", {
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
          {pinned && (
            <img
              className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
              src={Pin}
              alt="pin"
            />
          )}
          {isArchived && <TagItem name="Archived" />}
        </div>
      </div>
    </div>
  );
}
