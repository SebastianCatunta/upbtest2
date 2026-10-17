"use client";

import { useCallback, useEffect, useState } from "react";

const API_URL = "https://backendupbtest.onrender.com";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  createdAt: string;
};

type Formulario = { nombre: string; precio: string; stock: string };
const emptyForm: Formulario = { nombre: "", precio: "", stock: "" };

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store", ...options });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || `Error HTTP ${response.status}`);
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

export default function ProductosPanel() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [form, setForm] = useState<Formulario>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState("");
  const [selected, setSelected] = useState<Producto | null>(null);
  const [status, setStatus] = useState("Comprobando conexión...");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setProductos(await api<Producto[]>("/api/productos"));
      setStatus("Backend conectado · catálogo disponible");
      setFeedback("");
    } catch (error) {
      setStatus("No se pudo conectar con el backend");
      setFeedback(error instanceof Error ? error.message : "No se pudo cargar el catálogo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { void refresh(); }, 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nombre = form.nombre.trim();
    const precio = Number(form.precio);
    const stock = Number(form.stock);
    if (!nombre || nombre.length > 100 || form.precio.trim() === "" || !Number.isFinite(precio) || precio < 0 || form.stock.trim() === "" || !Number.isInteger(stock) || stock < 0) {
      setFeedback("Ingresa un nombre (máximo 100 caracteres), un precio válido y un stock entero no negativo.");
      return;
    }
    setBusy(true);
    try {
      const isEditing = editingId !== null;
      await api<Producto>(isEditing ? `/api/productos/${editingId}` : "/api/productos", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, stock }),
      });
      setForm(emptyForm);
      setEditingId(null);
      await refresh();
      setFeedback(isEditing ? "Producto actualizado correctamente." : "Producto creado correctamente.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "No se pudo guardar el producto.");
    } finally {
      setBusy(false);
    }
  }

  async function find(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[1-9]\d*$/.test(searchId)) {
      setFeedback("Ingresa un ID entero positivo.");
      return;
    }
    setBusy(true);
    try {
      const producto = await api<Producto>(`/api/productos/${searchId}`);
      setSelected(producto);
      setFeedback(`Producto #${producto.id} encontrado.`);
    } catch (error) {
      setSelected(null);
      setFeedback(error instanceof Error ? error.message : "No se pudo buscar el producto.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(producto: Producto) {
    if (!window.confirm(`¿Eliminar «${producto.nombre}»? Esta acción no se puede deshacer.`)) return;
    setBusy(true);
    try {
      await api<void>(`/api/productos/${producto.id}`, { method: "DELETE" });
      if (selected?.id === producto.id) setSelected(null);
      if (editingId === producto.id) { setEditingId(null); setForm(emptyForm); }
      await refresh();
      setFeedback("Producto eliminado correctamente.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "No se pudo eliminar el producto.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="products-section" id="productos" aria-labelledby="products-title">
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">API BACKENDUPB / CONEXIÓN EN VIVO</span>
          <h2 id="products-title">Productos en tiempo real.</h2>
          <p>Prueba los endpoints de Render y los datos guardados en PostgreSQL.</p>
          <p className="api-status" role="status">{status}</p>
        </div>
        <div className="products-grid">
          <div className="products-card">
            <div className="products-card-header"><h3>Catálogo</h3><button type="button" onClick={() => void refresh()} disabled={loading || busy}>Actualizar lista</button></div>
            {loading ? <p>Cargando productos...</p> : productos.length === 0 ? <p>No hay productos todavía. Crea uno para probar la conexión.</p> : (
              <ul className="products-list">
                {productos.map((producto) => (
                  <li key={producto.id}>
                    <div><strong>{producto.nombre}</strong><small>#{producto.id} · Stock: {producto.stock} · ${Number(producto.precio).toFixed(2)}</small></div>
                    <div className="product-actions">
                      <button type="button" disabled={busy} onClick={() => { setEditingId(producto.id); setForm({ nombre: producto.nombre, precio: String(producto.precio), stock: String(producto.stock) }); }}>Editar</button>
                      <button type="button" disabled={busy} onClick={() => void remove(producto)}>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <form className="product-search" onSubmit={find}>
              <label htmlFor="search-id">Consultar por ID</label>
              <div><input id="search-id" type="number" min="1" step="1" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="ID del producto" required /><button type="submit" disabled={busy}>Buscar</button></div>
            </form>
            {selected && <p className="product-result">#{selected.id} · {selected.nombre} · ${Number(selected.precio).toFixed(2)} · Stock: {selected.stock}</p>}
          </div>
          <form className="products-card product-form" onSubmit={save}>
            <h3>{editingId !== null ? `Editar producto #${editingId}` : "Crear producto"}</h3>
            <label htmlFor="product-name">Nombre</label>
            <input id="product-name" maxLength={100} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            <label htmlFor="product-price">Precio</label>
            <input id="product-price" type="number" min="0" step="any" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required />
            <label htmlFor="product-stock">Stock</label>
            <input id="product-stock" type="number" min="0" step="1" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <div className="form-actions"><button className="button button-primary" type="submit" disabled={busy}>{busy ? "Procesando..." : editingId !== null ? "Guardar cambios" : "Crear producto"}</button>{editingId !== null && <button type="button" disabled={busy} onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancelar</button>}</div>
          </form>
        </div>
        {feedback && <p className="api-feedback" role="status">{feedback}</p>}
      </div>
    </section>
  );
}
