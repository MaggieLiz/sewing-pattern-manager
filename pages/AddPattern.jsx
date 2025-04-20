import { useState } from 'react'
import { supabase } from '../supabase'

const PATTERN_TYPES = ['Dress', 'Top', 'Bottom', 'Skirt', 'Outerwear', 'Accessory']

export default function AddPattern() {
  const [form, setForm] = useState({ name: '', designer: '', type: '', tags: '', notes: '' })

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
      <div>
        <label className="block font-semibold">Pattern Name</label>
        <input
          name="name"
          placeholder="Pattern Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Designer</label>
        <input
          name="designer"
          placeholder="Designer"
          value={form.designer}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Type</option>
          {PATTERN_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Tags</label>
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Notes</label>
        <textarea
          name="notes"
          placeholder="Notes about usage, fit, mods, etc."
          value={form.notes}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Pattern
      </button>
    </div>
  )
}
