import { useState } from "react";
import BookmarkHeader from "./bookmark-header";
import Cards from "./cards";

export default function Bookmarks({ searchQuery }: { searchQuery: string }) {
  const [sortByDate, setSortByDate] = useState(false);

  return (
    <div className="dark:bg-[#051513]">
      <BookmarkHeader
        sortByDate={sortByDate}
        onSort={() => setSortByDate((prev) => !prev)}
      />
      <Cards searchQuery={searchQuery} sortByDate={sortByDate} />
    </div>
  );
}
