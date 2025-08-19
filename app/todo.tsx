"use client";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  time: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: todos.length + 1,
      text: input,
      done: false,
      time: new Date().toLocaleTimeString(),
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleDone = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1>✨ My Modern Todo List</h1>
      </nav>

      <main>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add your task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <span>
                {todo.id}. {todo.text} <small>({todo.time})</small>
              </span>
              <div className="actions">
                <button onClick={() => toggleDone(todo.id)}>
                  {todo.done ? "Undo" : "Done"}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer>
        <p>© 2025 My Todo List App</p>
      </footer>
    </div>
  );
}
