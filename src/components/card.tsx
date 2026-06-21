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
            <>
              {/* background color fix  */}
              <div className="absolute right-0 z-50 flex h-50 w-50 flex-col items-start gap-1 rounded-lg border border-[#004241] bg-[#002E2D] p-2 shadow-[06px14px0rgba(34,38,39,0.10)]">
                <div className="flex w-full items-center gap-2.5 rounded-md p-2">
                  <img
                    className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                    src={Visit}
                    alt="visit"
                  />
                  <p className="font-manrope w-full text-sm leading-[1.4em] font-semibold text-[#B1B9B9]">
                    Visit
                  </p>
                </div>
                <div
                  onClick={handleCopy}
                  className="flex w-46 cursor-pointer items-center gap-2.5 rounded-md p-2"
                >
                  <img
                    className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                    src={Copy}
                    alt="copy"
                  />
                  <p className="font-manrope w-full text-sm leading-[1.4em] font-semibold text-[#B1B9B9]">
                    {copied ? "Copied!" : "Copy URL"}
                  </p>
                </div>
                <div className="flex w-46 items-center gap-2.5 rounded-md p-2">
                  {pinned ? (
                    <img
                      className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                      src={Unpin}
                      alt="unpin"
                    />
                  ) : (
                    <img
                      className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                      src={Pin}
                      alt="pin"
                    />
                  )}

                  <p className="font-manrope w-full text-sm leading-[1.4em] font-semibold text-[#B1B9B9]">
                    {pinned ? "Unpin" : "Pin"}
                  </p>
                </div>
                <div
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex w-46 cursor-pointer items-center gap-2.5 rounded-md p-2"
                >
                  <img
                    className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                    src={Edit}
                    alt="edit"
                  />
                  <p className="font-manrope w-full text-sm leading-[1.4em] font-semibold text-[#B1B9B9]">
                    Edit
                  </p>
                </div>
                {isEditModalOpen && (
                  <EditBookmark
                    bookmark={bookmark}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={fetchBookmarks}
                  />
                )}
                <div
                  className="flex w-46 cursor-pointer items-center gap-2.5 rounded-md p-2"
                  onClick={openArchiveModal}
                >
                  {isArchived ? (
                    <img
                      className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                      src={Unarchive}
                      alt="archive"
                    />
                  ) : (
                    <img
                      className="h-4 w-4 dark:brightness-0 dark:contrast-100 dark:invert"
                      src={Archive}
                      alt="unarchive"
                    />
                  )}

                  <p className="font-manrope w-full text-sm leading-[1.4em] font-semibold text-[#B1B9B9]">
                    {isArchived ? "Unarchive" : "Archive"}
                  </p>
                </div>
              </div>
            </>
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
