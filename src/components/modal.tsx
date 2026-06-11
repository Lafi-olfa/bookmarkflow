type ModalProps = {
  id: string;
  title: string;
  description: string;
  confirmText: string;
  onClose: () => void;
};

export default function Modal({
  id,
  title,
  description,
  confirmText,
  onClose,
}: ModalProps) {

const handleArchive = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/bookmarks/${id}/archive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Request failed");
    }

    const data = await res.json();
    console.log(data);

    onClose(); // fermer modal après succès
  } catch (err) {
    console.error(err);
  }
};
    
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          ✕
        </button>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#051513]">{title}</h2>

          <p className="text-sm font-medium text-[#4C5C59]">{description}</p>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg cursor-pointer border border-[#C0CFCC] px-4 py-3 font-semibold"
          >
            Cancel
          </button>

          <button onClick={handleArchive} className="rounded-lg cursor-pointer bg-[#CB0A04] px-4 py-3 font-semibold text-white">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
