import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

const PATTERN_TYPES = ['Dress', 'Top', 'Bottom', 'Skirt', 'Outerwear', 'Accessory']

export default function PatternDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pattern, setPattern] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', designer: '', type: '', tags: '', notes: '' })

  useEffect(() => {
    const fetchPattern = async () => {
      const { data, error } = await supabase.from('patterns').select('*').eq('id', id).single()
      if (error) console.error('Error loading pattern:', error.message)
      else {
        setPattern(data)
        setForm(data)
      }
      setLoading(false)
    }
    fetchPattern()
  }, [id])

  const handleDelete = async () => {
    const { error } = await supabase.from('patterns').delete().eq('id', id)
    if (error) return console.error('Delete failed:', error.message)
    navigate('/')
  }

  const handleUpdate = async () => {
    const { error } = await supabase.from('patterns').update(form).eq('id', id)
    if (error) return console.error('Update failed:', error.message)
    setPattern(form)
    setEditing(false)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  if (loading) return <p>Loading pattern...</p>
  if (!pattern) return <p>Pattern not found.</p>

  return (
    <div className="space-y-4">
      {editing ? (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Pattern Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block font-semibold">Designer</label>
            <input name="designer" value={form.designer} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block font-semibold">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded w-full">
              <option value="">Select Type</option>
              {PATTERN_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Tags</label>
            <input name="tags" value={form.tags} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block font-semibold">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
          <button onClick={() => setEditing(false)} className="px-4 py-2 ml-2 bg-gray-300 rounded">Cancel</button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{pattern.name}</h1>
          <p className="text-sm text-gray-600">by {pattern.designer}</p>
          <p>Type: {pattern.type}</p>
          <p>Tags: {pattern.tags}</p>
          <p className="whitespace-pre-wrap">{pattern.notes}</p>
          {pattern.image_url && (
          <img
            src={pattern.image_url}
            alt={pattern.name}
            className="w-60 rounded-xl shadow mb-4"
        />
        )}
          <button onClick={() => setEditing(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
        </>
      )}

      <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete Pattern</button>
    </div>
  )
}
