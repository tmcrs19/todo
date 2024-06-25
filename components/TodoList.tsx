"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@faceit/lib/redux/store"; // Adjust the import according to your store setup
import { TodoItem } from "./TodoItem";
import { addTodo, deleteTodo, toggleTodo } from "@faceit/lib/redux/slices/todo";

export const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      isCompleted: false,
    };
    dispatch(addTodo(newTodoItem));
    setNewTodo("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      <h2>TODO List</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new TODO"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Add TODO
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              title={todo.title}
              isCompleted={todo.isCompleted}
              onToggle={() => dispatch(toggleTodo(todo.id))}
              onDelete={() => dispatch(deleteTodo(todo.id))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
