import React from "react";

export interface ITodoItemProps {
  title: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<ITodoItemProps> = ({
  title,
  isCompleted,
  onToggle,
  onDelete,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onToggle();
    }
  };

  return (
    <article
      className={`${
        isCompleted ? "bg-green-300" : "bg-white"
      } border border-gray-300 p-4 rounded-lg mb-4 flex justify-between items-center`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onToggle}
          onKeyDown={handleKeyDown}
          className="mr-2"
          aria-label={`Mark ${title} as completed`}
        />
        <p className={`m-0 ${isCompleted ? "line-through" : ""}`}>{title}</p>
      </div>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white p-2 rounded-lg"
      >
        Delete
      </button>
    </article>
  );
};
