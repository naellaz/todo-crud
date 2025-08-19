"use client";
import { useState } from "react";
import TodoApp from "./todo";

export default function Home() {
  const [start, setStart] = useState(false);

  if (start) return <TodoApp />; // Masuk ke Todo List

  return (
    <div className="landing-container">
      <h1>✨ Welcome to My Modern Todo List</h1>
      <p>Organize your tasks easily and efficiently!</p>
      <button onClick={() => setStart(true)}>Start Todo</button>
    </div>
  );
}
