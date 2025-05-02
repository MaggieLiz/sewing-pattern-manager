import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Needle & Ward Logo" className="h-8 w-auto" />
          <span className="font-semibold text-xl text-gray-800">Pattern Manager</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-blue-600">
          <Link to="/">Home</Link>
          <Link to="/add">Add Pattern</Link>
          <Link to="/patterns">View Patterns</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2 text-blue-600">
          <Link to="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </Link>
          <Link to="/add" onClick={() => setIsOpen(false)} className="block">
            Add Pattern
          </Link>
          <Link to="/patterns" onClick={() => setIsOpen(false)} className="block">
            View Patterns
          </Link>
        </nav>
      )}
    </header>
  );
}