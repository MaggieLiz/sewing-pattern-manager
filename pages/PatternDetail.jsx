import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function PatternDetail() {
  const { id } = useParams()
  const [pattern, setPattern] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPattern = async () => {
      const { data, error } = await supabase.from('patterns').select('*').eq('id', id).single()
      if (error) console.error('Error loading pattern:', error.message)
      else setPattern(data)
      setLoading(false)
    }
    fetchPattern()
  }, [id])

  if (loading) return <p>Loading pattern...</p>
  if (!pattern) return <p>Pattern not found.</p>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{pattern.name}</h1>
      <p className="text-sm text-gray-600">by {pattern.designer}</p>
      <p>Type: {pattern.type}</p>
      <p>Tags: {pattern.tags}</p>
      <p className="whitespace-pre-wrap">{pattern.notes}</p>
    </div>
  )
}
