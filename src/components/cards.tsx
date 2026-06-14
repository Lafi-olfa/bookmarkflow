import { useEffect, useState } from "react";
import Card from "./card";

type Bookmark = {
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
};
export default function Cards({ sortByDate }: CardsProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const token = localStorage.getItem("token");

  const fetchBookmarks = async () => {
    const res = await fetch("http://localhost:5000/api/bookmarks");
    const data = await res.json();
    setBookmarks(data);
  };

  const handleArchive = async (id: string, isArchived: boolean) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isArchived: !isArchived }),
      });

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

  const sortedBookmarks = sortByDate
    ? [...bookmarks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : bookmarks;
  console.log(sortedBookmarks);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sortedBookmarks.map((bookmark) => (
          <Card
            key={bookmark._id}
            bookmark={bookmark}
            onArchive={handleArchive}
            fetchBookmarks={fetchBookmarks}
          />
        ))}
      </div>
    </>
  );
}
