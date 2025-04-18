import { useState } from "react";

export default function SewingPatternManager() {
  const [patterns, setPatterns] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designer: "",
    type: "",
    tags: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.designer) return;
    setPatterns((prev) => [...prev, { ...form, id: Date.now() }]);
    setForm({ name: "", designer: "", type: "", tags: "", notes: "" });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sewing Pattern Manager</h1>

      <div className="grid gap-4 mb-6">
        <input
          name="name"
          placeholder="Pattern Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="designer"
          placeholder="Designer"
          value={form.designer}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="type"
          placeholder="Type (e.g., dress, top)"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes about usage, fit, mods, etc."
          value={form.notes}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Pattern
        </button>
      </div>

      <div className="grid gap-4">
        {patterns.map((p) => (
          <div key={p.id} className="border rounded p-4 shadow">
            <h2 className="font-semibold text-xl">{p.name}</h2>
            <p className="text-sm text-gray-600">by {p.designer}</p>
            <p className="mt-2 text-sm">Type: {p.type}</p>
            <p className="text-sm">Tags: {p.tags}</p>
            <p className="mt-2 text-sm whitespace-pre-wrap">{p.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

