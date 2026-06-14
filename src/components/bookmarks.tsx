import { useState } from "react";
import BookmarkHeader from "./bookmark-header";
import Cards from "./cards";

export default function Bookmarks() {
  const [sortByDate, setSortByDate] = useState(false);

  return (
    <div className="dark:bg-[#051513]">
      <BookmarkHeader
        sortByDate={sortByDate}
        onSort={() => setSortByDate((prev) => !prev)}
      />
      <Cards sortByDate={sortByDate} />
    </div>
  );
}
