// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../pages/components/Layout'
import Home from '../pages/Home'
import PatternsList from '../pages/PatternsList'
import AddPattern from '../pages/AddPattern'
import PatternDetail from '../pages/PatternDetail'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patterns" element={<PatternsList />} />
          <Route path="/add" element={<AddPattern />} />
          <Route path="/pattern/:id" element={<PatternDetail />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}
