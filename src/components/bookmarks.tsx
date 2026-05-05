import BookmarkHeader from "./bookmark-header";
import Cards from "./cards";

export default function Bookmarks() {
  return (
    <>
      <div className="dark:bg-[#051513]">
        <BookmarkHeader />
        <Cards />
      </div>
    </>
  );
}
