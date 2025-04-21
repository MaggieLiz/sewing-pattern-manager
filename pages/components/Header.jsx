import { Link } from "react-router-dom"
import logo from "../../public/logo.png"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b shadow-sm bg-white">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Needle & Ward Logo" className="w-2 h-2 object-contain" />
        <span className="font-semibold text-xl text-gray-800">Pattern Manager</span>
      </Link>
      <nav className="flex gap-4 text-sm font-medium text-blue-600">
        <Link to="/">Home</Link>
        <Link to="/add">Add Pattern</Link>
        <Link to="/view">View Patterns</Link>
      </nav>
    </header>
  )
}