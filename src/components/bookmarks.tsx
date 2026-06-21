import { useState } from "react";
import BookmarkHeader from "./bookmark-header";
import Cards from "./cards";

export default function Bookmarks({
  searchQuery,
  selectedTags,
}: {
  searchQuery: string;
  selectedTags: string[];
}) {
  const [sortByDate, setSortByDate] = useState(false);

  return (
    <div>
      <BookmarkHeader
        sortByDate={sortByDate}
        onSort={() => setSortByDate((prev) => !prev)}
      />
      <Cards
        searchQuery={searchQuery}
        sortByDate={sortByDate}
        selectedTags={selectedTags}
      />
    </div>
  );
}
