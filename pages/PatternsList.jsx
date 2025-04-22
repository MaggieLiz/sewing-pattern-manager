import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

const PATTERN_TYPES = ['Dress', 'Top', 'Bottom', 'Skirt', 'Outerwear', 'Accessory']
const PAGE_SIZE = 10

function highlight(text, term) {
  if (!term) return text
  const regex = new RegExp(`(${term})`, 'gi')
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} className="bg-yellow-200">{part}</mark> : part
  )
}

export default function PatternsList() {
  const [patterns, setPatterns] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [filterType, setFilterType] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()

  const lastPatternRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const fetchPatterns = async (reset = false) => {
    setLoading(true)
    let query = supabase.from('patterns').select('*')
    if (filterType) query = query.eq('type', filterType)
    query = query.order(sortField, { ascending: sortOrder === 'asc' })
    query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

    const { data, error } = await query
    if (error) console.error('Error fetching patterns:', error.message)
    else {
      setPatterns(reset ? data : [...patterns, ...data])
      setHasMore(data.length === PAGE_SIZE)
    }
    setLoading(false)
  }

  useEffect(() => {
    setPage(1)
    fetchPatterns(true)
  }, [sortField, sortOrder, filterType])

  useEffect(() => {
    if (page > 1) fetchPatterns()
  }, [page])

  const filteredPatterns = patterns.filter((p) => {
    const combinedFields = `${p.name} ${p.designer} ${p.tags} ${p.notes}`.toLowerCase()
    return combinedFields.includes(searchTerm.toLowerCase())
  })

  if (loading && page === 1) return <p>Loading patterns...</p>

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="font-semibold">Sort by:</label>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border p-2 rounded">
          <option value="created_at">Date Added</option>
          <option value="name">Name</option>
          <option value="designer">Designer</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border p-2 rounded">
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <label className="font-semibold">Filter by type:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border p-2 rounded">
          <option value="">All</option>
          {PATTERN_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label className="font-semibold">Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by any field..."
          className="border p-2 rounded w-64"
        />
      </div>

      <div className="grid gap-6">
        {filteredPatterns.length === 0 && <p>No matching patterns found.</p>}
        {filteredPatterns.map((p, i) => {
          const isLast = i === filteredPatterns.length - 1
          return (
            <div
              ref={isLast ? lastPatternRef : null}
              key={p.id}
              className="border p-4 rounded shadow space-y-2"
            >
              <Link to={`/pattern/${p.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                {highlight(p.name, searchTerm)}
              </Link>
              <p className="text-sm text-gray-600">by {highlight(p.designer, searchTerm)}</p>
              <p className="text-sm">Type: {p.type}</p>
              <p className="text-sm text-gray-500">
                Tags: {highlight(p.tags, searchTerm)}
              </p>
              <p className="text-sm text-gray-500 whitespace-pre-wrap">
                Notes: {highlight(p.notes, searchTerm)}
              </p>
              <p className="text-sm text-gray-500">
                Added: {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-sm text-gray-500">
                Last Updated: {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          )
        })}
      </div>

      {loading && page > 1 && <p className="text-center">Loading more...</p>}
    </div>
  )
}
