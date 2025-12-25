import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function App() {
  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = useMemo(() => {
    const u = new URL("/posts", API_BASE);
    if (name.trim()) u.searchParams.set("name", name.trim());
    return u.toString();
  }, [name]);

  useEffect(() => {
    load();
  }, [url]);

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("No se pudo cargar la data. Revisa el backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-5">
            <h1 className="text-xl font-semibold text-slate-900">
              Posts agrupados por nombre
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Filtra por nombre y revisa cuántos posts tiene cada persona.
            </p>
          </div>

          {/* Controls */}
          <div className="px-6 py-5">
            <label className="block text-sm font-medium text-slate-700">
              Filtrar por nombre
            </label>

            <div className="mt-2 flex items-center gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Ej: "Luke"'
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
              />

              <button
                type="button"
                onClick={() => setName("")}
                className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Limpiar
              </button>
            </div>

            {/* States */}
            <div className="mt-4">
              {loading && (
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500" />
                  Cargando...
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          {!loading && !error && (
            <div className="px-6 pb-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Cantidad
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 bg-white">
                    {rows.map((r) => (
                      <tr key={r.name} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {r.name}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-800">
                          {r.postCount}
                        </td>
                      </tr>
                    ))}

                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={2} className="px-4 py-10 text-center text-slate-500">
                          Sin resultados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
