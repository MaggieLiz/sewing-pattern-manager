import { useState } from 'react'
import { supabase } from '../supabase'

const PATTERN_TYPES = ['Dress', 'Top', 'Bottom', 'Skirt', 'Outerwear', 'Accessory']

export default function AddPattern() {
  const [form, setForm] = useState({ name: '', designer: '', type: '', tags: '', notes: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!form.name || !form.designer) {
      alert("Please fill in at least the pattern name and designer.")
      return
    }
  
    setLoading(true)
  
    let imageUrl = ''
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const filePath = `patterns/${Date.now()}.${fileExt}`
  
      const { error: uploadError } = await supabase
        .storage
        .from('pattern-images')
        .upload(filePath, imageFile)
  
      if (uploadError) {
        console.error('Image upload failed:', uploadError.message)
        alert('Image upload failed.')
        setLoading(false)
        return
      }
  
      const { data: urlData } = supabase
        .storage
        .from('pattern-images')
        .getPublicUrl(filePath)
  
      imageUrl = urlData.publicUrl
    }
  
    const { error } = await supabase
      .from('patterns')
      .insert([{ ...form, image_url: imageUrl }])
  
    setLoading(false)
  
    if (error) {
      console.error('Supabase insert error:', error.message)
      alert('Failed to add pattern.')
      return
    }
  
    alert('Pattern added!')
    setForm({ name: '', designer: '', type: '', tags: '', notes: '' })
    setImageFile(null)
    setImagePreview(null)
  }

  return (
    <div className="grid gap-4">
      <div>
        <label className="block font-semibold">Pattern Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Designer</label>
        <input
          name="designer"
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
          value={form.tags}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-semibold">Notes</label>
        <textarea
          name="notes"
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
          onChange={(e) => {
            const file = e.target.files[0]
            if (file) {
              setImageFile(file)
              setImagePreview(URL.createObjectURL(file))
            }
          }}
          className="w-full"
        />
      </div>
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-40 mt-2 rounded-lg shadow" />
      )}
      <button
        onClick={handleAdd}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Adding...' : 'Add Pattern'}
      </button>
    </div>
  )
}