import { useState } from 'react'
import { supabase } from '../supabase'

const PATTERN_TYPES = ['Dress', 'Top', 'Bottom', 'Skirt', 'Outerwear', 'Accessory']

export default function AddPattern() {
  const [form, setForm] = useState({ name: '', designer: '', type: '', tags: '', notes: '' })
  const [imageFile, setImageFile] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleAdd = async () => {
    if (!form.name || !form.designer) return

    let imageUrl = ''
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const filePath = `patterns/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase
        .storage
        .from('pattern-images') // make sure this matches your bucket name in Supabase
        .upload(filePath, imageFile)

      if (uploadError) return console.error('Image upload failed:', uploadError.message)

      const { data: urlData } = supabase.storage.from('pattern-images').getPublicUrl(filePath)
      imageUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('patterns').insert([{ ...form, image_url: imageUrl }])
    if (error) return console.error('Supabase insert error:', error.message)
    alert('Pattern added!')
    setForm({ name: '', designer: '', type: '', tags: '', notes: '' })
    setImageFile(null)
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
      <div>
        <label className="block font-semibold">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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
