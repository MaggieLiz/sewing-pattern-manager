import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
