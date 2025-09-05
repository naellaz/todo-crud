'use client'
import { useEffect, useState } from 'react'

interface Todo {
  id: string
  title: string
  done: boolean
  createdAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchTodos() {
    const res = await fetch('/api/todos')
    if (res.ok) setTodos(await res.json())
  }

  useEffect(() => { fetchTodos() }, [])

  async function addTodo(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    if (res.ok) {
      setTitle('')
      fetchTodos()
    }
    setLoading(false)
  }

  async function toggleTodo(id: string, done: boolean) {
    await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, done: !done })
    })
    fetchTodos()
  }

  async function deleteTodo(id: string) {
    if (!confirm('Hapus todo ini?')) return
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchTodos()
  }

  // ✅ Return harus di dalam Home()
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6">
          📝 Todo Hero
        </h1>

        {/* Form tambah todo */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tulis todo baru..."
            className="flex-1 px-4 py-2 border-2 border-pink-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="min-w-[90px] px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition disabled:opacity-60"
          >
            {loading ? '...' : 'Tambah'}
          </button>
        </form>

        {/* Daftar todos */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Belum ada todo. Tambahkan yang pertama!
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow p-3 hover:shadow-md transition"
              >
                {/* Checkbox + Judul todo */}
                <label className="flex items-center gap-3 flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id, todo.done)}
                    className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span
                    className={`text-lg break-words ${
                      todo.done
                        ? 'line-through text-gray-400'
                        : 'text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {todo.title}
                  </span>
                </label>

                {/* Tombol hapus */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-4 px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
