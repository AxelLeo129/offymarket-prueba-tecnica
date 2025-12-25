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
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Posts agrupados por nombre</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <div style={{ margin: "16px 0" }}>
        <label style={{ display: "block", marginBottom: 6 }}>Filtrar por nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Ej: "ana"'
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left" style={{ borderBottom: "1px solid #ddd" }}>Nombre</th>
              <th align="right" style={{ borderBottom: "1px solid #ddd" }}>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td style={{ borderBottom: "1px solid #f0f0f0" }}>{r.name}</td>
                <td align="right" style={{ borderBottom: "1px solid #f0f0f0" }}>
                  {r.postCount}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan="2" style={{ padding: 16 }}>
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
