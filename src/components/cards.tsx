import { useEffect, useState } from "react";
import Card from "./card";

export type Bookmark = {
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

type CardsProps = {
  sortByDate: boolean;
  searchQuery: string;
  selectedTags: string[];
};
export default function Cards({
  sortByDate,
  searchQuery,
  selectedTags,
}: CardsProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookmarks = async () => {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookmarks/`);

    const data = await res.json();
    setBookmarks(data);
    setIsLoading(false);
  };

  const handleArchive = async (id: string, isArchived: boolean) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookmarks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isArchived: !isArchived }),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Request failed");
      }

      await fetchBookmarks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    void fetchBookmarks();
    window.addEventListener("bookmark-added", fetchBookmarks);
    return () => window.removeEventListener("bookmark-added", fetchBookmarks);
  }, []);

  const filteredBookmarks = bookmarks
    .filter((b) =>
      searchQuery
        ? b.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    )
    .filter((b) =>
      selectedTags.length > 0
        ? selectedTags.every((tag) => b.tags.includes(tag))
        : true,
    );

  const sortedBookmarks = sortByDate
    ? [...filteredBookmarks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : filteredBookmarks;

  return (
    <>
      {isLoading ? (
        <p className="dark:text-white">Loading...</p>
      ) : sortedBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedBookmarks.map((bookmark) => (
            <Card
              key={bookmark._id}
              bookmark={bookmark}
              onArchive={handleArchive}
              fetchBookmarks={fetchBookmarks}
            />
          ))}
        </div>
      ) : (
        <p className="dark:text-white">No bookmarks found</p>
      )}
    </>
  );
}
