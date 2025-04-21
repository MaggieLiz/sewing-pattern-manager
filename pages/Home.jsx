import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Needle & Ward</h1>
      <p className="text-lg text-gray-700 max-w-xl mb-8">
        A digital catalog to manage your sewing patterns, track versions, add tags, images, and more.
      </p>
      <div className="flex gap-4">
        <Link
          to="/add"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Add Pattern
        </Link>
        <Link
          to="/Patterns"
          className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300"
        >
          View Patterns
        </Link>
      </div>
    </div>
  )
}
