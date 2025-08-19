'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

interface Todo {
  id: number
  text: string
  desc: string
  done: boolean
  timestamp: string
  category: 'Penting' | 'Santai' | 'Sekolah'
  priority: 'High' | 'Medium' | 'Low'
}

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState<'Penting'|'Santai'|'Sekolah'>('Penting')
  const [priority, setPriority] = useState<'High'|'Medium'|'Low'>('Medium')
  const [editId, setEditId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'All'|'Completed'|'Pending'>('All')

  const handleAdd = () => {
    if (!input.trim()) return
    if (editId !== null) {
      setTodos(todos.map(todo => todo.id === editId ? { ...todo, text: input, desc, category, priority } : todo))
      setEditId(null)
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          desc,
          done: false,
          timestamp: new Date().toLocaleTimeString(),
          category,
          priority,
        }
      ])
    }
    setInput(''); setDesc('')
  }

  const handleEdit = (todo: Todo) => {
    setInput(todo.text)
    setDesc(todo.desc)
    setCategory(todo.category)
    setPriority(todo.priority)
    setEditId(todo.id)
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
    if (editId === id) setEditId(null)
  }

  const toggleDone = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(todos)
    const [reordered] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reordered)
    setTodos(items)
  }

  const filteredTodos = todos.filter(todo => 
    (filterStatus === 'All' || (filterStatus === 'Completed' && todo.done) || (filterStatus === 'Pending' && !todo.done)) &&
    todo.text.toLowerCase().includes(search.toLowerCase())
  )

  const progress = todos.length ? Math.round(todos.filter(t => t.done).length / todos.length * 100) : 0

  useEffect(() => {
    const btn = document.getElementById('theme-toggle')
    btn?.addEventListener('click', () => {
      document.body.classList.toggle('bg-lightbg')
      document.body.classList.toggle('bg-gray-900')
      document.body.classList.toggle('text-gray-100')
    })
  }, [])

  return (
    <div className="container mx-auto p-4">
      {/* Form */}
      <div className="mb-4 flex flex-col gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Judul kegiatan..." className="p-2 border rounded"/>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Deskripsi (opsional)" className="p-2 border rounded"/>
        <div className="flex gap-2">
          <select value={category} onChange={e=>setCategory(e.target.value as any)} className="p-2 border rounded">
            <option value="Penting">Penting</option>
            <option value="Santai">Santai</option>
            <option value="Sekolah">Sekolah</option>
          </select>
          <select value={priority} onChange={e=>setPriority(e.target.value as any)} className="p-2 border rounded">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleAdd} className="bg-primary text-white px-4 rounded">{editId !== null ? 'Update' : 'Tambah'}</button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex justify-between mb-4">
        <div>
          <button onClick={()=>setFilterStatus('All')} className="px-2 py-1 border rounded mr-1">All</button>
          <button onClick={()=>setFilterStatus('Completed')} className="px-2 py-1 border rounded mr-1">Completed</button>
          <button onClick={()=>setFilterStatus('Pending')} className="px-2 py-1 border rounded">Pending</button>
        </div>
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} className="p-2 border rounded"/>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="h-4 w-full bg-gray-200 rounded">
          <div className="h-4 bg-primary rounded transition-all" style={{width: `${progress}%`}}></div>
        </div>
        <p className="text-sm mt-1">{progress}% completed</p>
      </div>

      {/* Todo List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2">
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {provided => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`p-2 border rounded flex justify-between items-start ${todo.done?'bg-red-100':'bg-lightbg'} transition-all`}>
                      <div className="flex gap-2 items-start">
                        <input type="checkbox" checked={todo.done} onChange={()=>toggleDone(todo.id)} className="mt-1"/>
                        <div>
                          <div className={`${todo.done?'line-through text-gray-500':''}`}>{index+1}. {todo.text} <span className="text-xs px-1 rounded bg-secondary">{todo.category}</span> <span className="text-xs px-1 rounded bg-red-200">{todo.priority}</span></div>
                          {todo.desc && <div className="text-sm text-gray-600">{todo.desc}</div>}
                          <div className="text-xs text-gray-500">[{todo.timestamp}]</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button className="bg-secondary px-2 rounded" onClick={()=>handleEdit(todo)}>Edit</button>
                        <button className="bg-danger px-2 rounded" onClick={()=>handleDelete(todo.id)}>Hapus</button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
