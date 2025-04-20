import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PatternsList from '../pages/PatternsList'
import AddPattern from '../pages/AddPattern'

export default function App() {
  return (
    <Router>
      <div className="p-6 max-w-4xl mx-auto">
        <nav className="flex gap-4 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">View Patterns</Link>
          <Link to="/add" className="text-blue-600 hover:underline">Add Pattern</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PatternsList />} />
          <Route path="/add" element={<AddPattern />} />
        </Routes>
      </div>
    </Router>
  )
}
