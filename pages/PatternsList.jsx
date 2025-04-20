import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function PatternsList() {
  const [patterns, setPatterns] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchPatterns = async () => {
      const { data, error } = await supabase.from('patterns').select('*').order('created_at', { ascending: false })
      if (error) console.error('Supabase fetch error:', error.message)
      else setPatterns(data)
    }
    fetchPatterns()
  }, [])

  const filtered = patterns.filter((p) => {
    const query = search.toLowerCase()
    return (
      p.name?.toLowerCase().includes(query) ||
      p.designer?.toLowerCase().includes(query) ||
      p.type?.toLowerCase().includes(query) ||
      p.tags?.toLowerCase().includes(query)
    )
  })


  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, type, designer, or tag"
        className="border p-2 rounded w-full mb-4"
      />

      <div className="grid gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="border rounded p-4 shadow">
            <h2 className="font-semibold text-xl">{p.name}</h2>
            <p className="text-sm text-gray-600">by {p.designer}</p>
            <p className="mt-2 text-sm">Type: {p.type}</p>
            <p className="text-sm">Tags: {p.tags}</p>
            <p className="mt-2 text-sm whitespace-pre-wrap">{p.notes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}