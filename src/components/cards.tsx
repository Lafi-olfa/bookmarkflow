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

export default function Cards() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await fetch("http://localhost:5000/api/bookmarks");
      const data = await res.json();
      setBookmarks(data);
    };

    void fetchBookmarks();
  }, []);
  console.log("bookmarks", bookmarks);
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((bookmark, index) => (
          <Card key={index} bookmark={bookmark} />
        ))}
      </div>
    </>
  );
}
