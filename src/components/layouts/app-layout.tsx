import { useState } from "react";
import Bookmarks from "../bookmarks";
import Navbar from "../navbar";
import Sidebar from "../sibebar";

export default function AppLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="flex min-h-screen dark:bg-[#051513]">
      <aside className="hidden w-64 shrink-0 lg:block dark:bg-[#002E2D]">
        <Sidebar
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClose={() => setIsSidebarOpen(false)}
        />
      </aside>

      <div className="flex flex-1 flex-col">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />
        <main className="flex-1 dark:bg-[#051513]">
          <Bookmarks searchQuery={searchQuery} selectedTags={selectedTags} />
        </main>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-100 flex lg:hidden">
          <aside className="w-64 dark:bg-[#002E2D]">
            <Sidebar
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              onClose={() => setIsSidebarOpen(false)}
            />
          </aside>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
