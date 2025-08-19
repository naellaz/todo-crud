'use client'

import { useState } from 'react'

interface Todo {
  id: number
  text: string
  desc: string
  done: boolean
  timestamp: string
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [desc, setDesc] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  const handleAdd = () => {
    if (!input.trim()) return
    if (editId !== null) {
      setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: input, desc } : todo))
      setEditId(null)
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          desc: desc,
          done: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ])
    }
    setInput('')
    setDesc('')
  }

  const handleEdit = (id: number, text: string, descText: string) => {
    setInput(text)
    setDesc(descText)
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
      <form onSubmit={e => { e.preventDefault(); handleAdd() }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Judul kegiatan..."
        />
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Deskripsi kegiatan (opsional)"
          rows={2}
        />
        <button type="submit" className="add-btn">{editId !== null ? 'Update' : 'Tambah'}</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} className={todo.done ? 'completed' : ''}>
            <div className="todo-left">
              <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo.id)} />
              <div>
                <div className={`todo-text ${todo.done ? 'completed' : ''}`}>
                  {index + 1}. {todo.text}
                </div>
                {todo.desc && <div className="todo-desc">{todo.desc}</div>}
                <div className="todo-meta">[{todo.timestamp}]</div>
              </div>
            </div>
            <div>
              <button className="edit-btn" onClick={() => handleEdit(todo.id, todo.text, todo.desc)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
