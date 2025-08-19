'use client'

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
  timestamp: string
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  const handleAdd = () => {
    if (!input.trim()) return
    if (editId !== null) {
      setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: input } : todo))
      setEditId(null)
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          done: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ])
    }
    setInput('')
  }

  const handleEdit = (id: number, text: string) => {
    setInput(text)
    setEditId(id)
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
    if (editId === id) setEditId(null)
  }

  const toggleDone = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={e => { e.preventDefault(); handleAdd() }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Tambah kegiatan..."
        />
        <button type="submit">{editId !== null ? 'Update' : 'Tambah'}</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <div>
              <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo.id)} />
              <span className={todo.done ? 'completed' : ''}>
                {index + 1}. {todo.text}
              </span>
              <div className="todo-meta">[{todo.timestamp}]</div>
            </div>
            <div>
              <button className="edit-btn" onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
