// src/components/Layout.jsx
import Header from "./Header"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
