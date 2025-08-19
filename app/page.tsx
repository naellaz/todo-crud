// app/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-md">
        {todos.map((todo, i) => (
          <li
            key={i}
            className="flex justify-between items-center border-b py-2"
          >
            {todo}
            <button
              onClick={() => deleteTodo(i)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
