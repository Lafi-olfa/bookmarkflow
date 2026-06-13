import { useState } from "react";
import AuthTemplate from "./auth-template";
type DataForm = {
  title: string;
  description: string;
  websiteUrl: string;
  tags: string;
};
export default function AddBookmark({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    websiteUrl: "",
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(formData);

  async function addNewBookmark(data: DataForm) {
    const res = await fetch("http://localhost:5000/api/bookmarks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()),
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Signup failed");
    }
    return res.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addNewBookmark(formData);
      setFormData({ title: "", description: "", websiteUrl: "", tags: "" }); // vider les inputs
      window.dispatchEvent(new Event("bookmark-added"));
      onClose();
    } catch (err) {
      console.error("Adding bookmark failed:", err);
    }
  };
  return (
    // <div className="absolute flex min-h-screen w-full flex-col items-center justify-center gap-8 rounded-xl bg-[#e8f0ef] px-4 py-8">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <AuthTemplate
        title="Add a Bookmark"
        description="Save a link with details to keep your collection organized."
        fields={[
          {
            fieldName: "Title *",
            type: "text",
            name: "title",
          },
          {
            fieldName: "Description *",
            type: "text",
            name: "description",
          },
          {
            fieldName: "Website URL *",
            type: "text",
            name: "websiteUrl",
          },
          {
            fieldName: "Tags *",
            type: "text",
            name: "tags",
            placeholder: "e.g. design, learning, tools",
          },
        ]}
        buttonTitle="Add Bookmark"
        // links={[
        //   {
        //     action: "Back to login",
        //     href: "/sign-in",
        //   },
        // ]}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
}
