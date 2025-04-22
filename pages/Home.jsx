import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Needle & Ward</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
        A digital catalog to manage your sewing patterns, track versions, add tags, images, and more.
      </p>

      <div className="flex justify-center gap-4">
        <Link to="/add" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Pattern
        </Link>
        <Link to="/patterns" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          View Patterns
        </Link>
      </div>
    </div>
  )
}