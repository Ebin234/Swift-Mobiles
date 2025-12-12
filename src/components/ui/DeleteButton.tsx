"use client";
const DeleteButton = ({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete: (id: string) => Promise<void>;
}) => {
  return (
    <button
      onClick={() => handleDelete(id)}
      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
