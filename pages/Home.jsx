import { Link } from "react-router-dom"

export default function Home() {
  return (
    <section className="text-center space-y-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900">Needle & Ward</h1>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        A digital catalog to manage your sewing patterns: add images, track versions, apply tags, and more.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/add"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Pattern
        </Link>
        <Link
          to="/patterns"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          View Patterns
        </Link>
      </div>
      <p className="text-sm text-gray-500">Designed by sewists, for sewists.</p>
    </section>
  )
}
