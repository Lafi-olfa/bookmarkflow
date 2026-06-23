// EditBookmark.tsx
import { useState } from "react";
import AuthTemplate from "./auth-template";

type BookmarkItem = {
  _id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
};

type EditBookmarkProps = {
  bookmark: BookmarkItem;
  onClose: () => void;
  onUpdate: () => void;
};

export default function EditBookmark({
  bookmark,
  onClose,
  onUpdate,
}: EditBookmarkProps) {
  const [formData, setFormData] = useState({
    title: bookmark.title,
    description: bookmark.description,
    url: bookmark.url,
    tags: bookmark.tags.join(", "),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:10000/api/bookmarks/${bookmark._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            url: formData.url,
            tags: formData.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          }),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Update failed");
      }

      onUpdate();
      onClose();
    } catch (err) {
      console.error("Edit bookmark error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <AuthTemplate
        title="Edit Bookmark"
        description="Update your saved link details — change the title, description, URL, or tags anytime."
        fields={[
          { fieldName: "Title *", type: "text", name: "title" },
          { fieldName: "Description *", type: "text", name: "description" },
          { fieldName: "Website URL *", type: "text", name: "url" },
          {
            fieldName: "Tags *",
            type: "text",
            name: "tags",
            placeholder: "e.g. design, learning, tools",
          },
        ]}
        buttonTitle="Save Changes"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
}
