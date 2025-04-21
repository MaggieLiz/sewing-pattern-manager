import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PatternsList from '../pages/PatternsList'
import AddPattern from '../pages/AddPattern'
import PatternDetail from '../pages/PatternDetail'
import Home from '../pages/Home'
import Header from '../pages/components/Header'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patterns" element={<PatternsList />} />
        <Route path="/add" element={<AddPattern />} />
        <Route path="/pattern/:id" element={<PatternDetail />} />
      </Routes>
    </Router>
  )
}
