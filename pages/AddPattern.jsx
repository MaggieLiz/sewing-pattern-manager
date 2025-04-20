import { useState } from 'react'
import { supabase } from '../supabase'

export default function AddPattern() {
  const [form, setForm] = useState({
    name: '', designer: '', type: '', tags: '', notes: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = async () => {
    if (!form.name || !form.designer) return
    const { error } = await supabase.from('patterns').insert([form])
    if (error) return console.error('Supabase insert error:', error.message)
    alert('Pattern added!')
    setForm({ name: '', designer: '', type: '', tags: '', notes: '' })
  }

  return (
    <div className="grid gap-4">
      <input
  name="name"
  placeholder="Pattern Name"
  autoComplete="off"
  value={form.name}
  onChange={handleChange}
  className="border p-2 rounded"
/>

<input
  name="designer"
  placeholder="Designer"
  autoComplete="organization"
  value={form.designer}
  onChange={handleChange}
  className="border p-2 rounded"
/>

<input
  name="type"
  placeholder="Type (e.g., dress, top)"
  autoComplete="off"
  value={form.type}
  onChange={handleChange}
  className="border p-2 rounded"
/>

<input
  name="tags"
  placeholder="Tags (comma-separated)"
  autoComplete="off"
  value={form.tags}
  onChange={handleChange}
  className="border p-2 rounded"
/>

<textarea
  name="notes"
  placeholder="Notes about usage, fit, mods, etc."
  autoComplete="off"
  value={form.notes}
  onChange={handleChange}
  className="border p-2 rounded"
/>
      <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Pattern</button>
    </div>
  )
}