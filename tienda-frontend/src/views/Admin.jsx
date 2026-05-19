import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../layout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const CATEGORIES = ["Frutas", "Verduras", "Hierbas", "Pecuarios", "Condimentos", "Cítricos"];
const UNITS = ["kg", "pza", "docena", "atado", "lt", "g"];
const COLORS = ["#2e7d32", "#43a047", "#66bb6a", "#a5d6a7", "#f57f17", "#81c784"];

const emptyForm = { name: "", description: "", price: "", stock: "", unit: "pza", category: "Frutas", image_url: "" };

const Admin = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!store.token) navigate("/login");
  }, [store.token]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      unit: product.unit || "pza",
      category: product.category || "Frutas",
      image_url: product.image_url || "",
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    if (editProduct) {
      actions.updateProduct(editProduct.id, data);
      showToast("Producto actualizado ✅");
    } else {
      actions.createProduct(data);
      showToast("Producto creado ✅");
    }
    setShowModal(false);
    setForm(emptyForm);
    setEditProduct(null);
  };

  const handleDelete = (id) => {
    actions.deleteProduct(id);
    setDeleteConfirm(null);
    showToast("Producto eliminado 🗑️");
  };

  const filtered = (store.products || []).filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const byCategory = CATEGORIES.map((cat) => ({
    name: cat,
    cantidad: (store.products || []).filter((p) => p.category === cat).length,
    valor: (store.products || []).filter((p) => p.category === cat).reduce((a, p) => a + p.price, 0),
  })).filter((c) => c.cantidad > 0);

  const totalStock = (store.products || []).reduce((a, p) => a + (p.stock || 0), 0);
  const totalValue = (store.products || []).reduce((a, p) => a + p.price * (p.stock || 0), 0);
  const cartTotal = store.cart.reduce((a, i) => a + i.price * i.quantity, 0);
  const lowStock = (store.products || []).filter((p) => p.stock <= 5 && p.stock > 0);

  const tabs = [
    { id: "dashboard", icon: "fas fa-chart-bar", label: "Dashboard" },
    { id: "products", icon: "fas fa-boxes", label: "Productos" },
    { id: "cart", icon: "fas fa-shopping-basket", label: "Carrito" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--primary)" }}>
      {toast && (
        <div style={{
          position: "fixed", top: "20px", right: "20px", zIndex: 9999,
          background: toast.type === "success" ? "var(--accent)" : "var(--danger)",
          color: "#fff", padding: "14px 24px", borderRadius: "12px",
          fontWeight: 700, boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          animation: "slideUp 0.3s ease",
        }}>
          {toast.msg}
        </div>
      )}

      <div className="row g-0" style={{ minHeight: "100vh" }}>
        <div className="col-auto admin-sidebar" style={{ width: "240px" }}>
          <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem", color: "#fff" }}>🥦 La Verde</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Panel de administración</div>
          </div>
          {tabs.map((t) => (
            <button key={t.id} className={"admin-nav-link " + (tab === t.id ? "active" : "")} onClick={() => setTab(t.id)}>
              <i className={t.icon} style={{ width: "20px" }}></i> {t.label}
            </button>
          ))}
          <div style={{ position: "absolute", bottom: "24px", left: 0, right: 0, padding: "0 24px" }}>
            <button className="admin-nav-link" onClick={() => navigate("/")}>
              <i className="fas fa-arrow-left" style={{ width: "20px" }}></i> Volver a la tienda
            </button>
          </div>
        </div>

        <div className="col" style={{ padding: "32px", overflowX: "hidden" }}>

          {tab === "dashboard" && (
            <>
              <h2 style={{ color: "var(--accent)", marginBottom: "8px" }}>Dashboard 📊</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
                Bienvenido, {store.user?.firstName}. Resumen general de la tienda.
              </p>

              <div className="row g-4 mb-5">
                {[
                  { icon: "🥦", label: "Total productos", value: store.products?.length || 0, sub: "en catálogo" },
                  { icon: "📦", label: "Stock total", value: totalStock, sub: "unidades disponibles" },
                  { icon: "💰", label: "Valor inventario", value: "$" + totalValue.toFixed(0), sub: "precio × stock" },
                  { icon: "🛒", label: "Carrito activo", value: "$" + cartTotal.toFixed(0), sub: store.cart.length + " productos" },
                ].map(({ icon, label, value, sub }) => (
                  <div key={label} className="col-sm-6 col-xl-3">
                    <div className="card-stat">
                      <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{icon}</div>
                      <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--accent)", fontFamily: "'Fredoka One', cursive" }}>{value}</div>
                      <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem" }}>{label}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4 mb-5">
                <div className="col-lg-7">
                  <div className="card-dark p-4">
                    <h5 style={{ color: "var(--accent)", marginBottom: "20px" }}>Productos por categoría</h5>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={byCategory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(46,125,50,0.1)" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#5a7a5a", fontFamily: "Nunito" }} />
                        <YAxis tick={{ fontSize: 12, fill: "#5a7a5a" }} />
                        <Tooltip
                          contentStyle={{ background: "#fff", border: "1px solid rgba(46,125,50,0.2)", borderRadius: "10px", fontFamily: "Nunito" }}
                          formatter={(v) => [v, "Productos"]}
                        />
                        <Bar dataKey="cantidad" radius={[8, 8, 0, 0]}>
                          {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="card-dark p-4">
                    <h5 style={{ color: "var(--accent)", marginBottom: "20px" }}>Distribución del catálogo</h5>
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie data={byCategory} dataKey="cantidad" nameKey="name" cx="50%" cy="50%" outerRadius={90} paddingAngle={3}>
                          {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(46,125,50,0.2)", borderRadius: "10px", fontFamily: "Nunito" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", fontFamily: "Nunito" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {lowStock.length > 0 && (
                <div className="card-dark p-4">
                  <h5 style={{ color: "var(--gold)", marginBottom: "16px" }}>⚠️ Stock bajo (≤5 unidades)</h5>
                  <div className="row g-3">
                    {lowStock.map((p) => (
                      <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
                        <div style={{ background: "rgba(245,127,23,0.08)", border: "1px solid rgba(245,127,23,0.3)", borderRadius: "12px", padding: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
                          <img src={p.image_url || "https://placehold.co/48x48/e8f5e9/2e7d32?text=🥦"} alt={p.name} style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{p.name}</div>
                            <div style={{ color: "var(--gold)", fontWeight: 800, fontSize: "0.85rem" }}>{p.stock} {p.unit} restantes</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "products" && (
            <>
              <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                <div>
                  <h2 style={{ color: "var(--accent)", marginBottom: "4px" }}>Productos 🥦</h2>
                  <p style={{ color: "var(--text-muted)", margin: 0 }}>{filtered.length} productos en catálogo</p>
                </div>
                <div className="d-flex gap-3 align-items-center flex-wrap">
                  <div className="position-relative">
                    <i className="fas fa-search position-absolute" style={{ left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}></i>
                    <input
                      type="text"
                      className="form-control-dark"
                      placeholder="Buscar producto..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ paddingLeft: "40px", minWidth: "220px" }}
                    />
                  </div>
                  <button className="btn btn-accent" onClick={openCreate}>
                    <i className="fas fa-plus me-2"></i>Nuevo producto
                  </button>
                </div>
              </div>

              <div className="card-dark p-0" style={{ overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table className="table-verde">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Unidad</th>
                        <th style={{ textAlign: "right" }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img src={p.image_url || "https://placehold.co/48x48/e8f5e9/2e7d32?text=🥦"} alt={p.name}
                                style={{ width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                              <div>
                                <div style={{ fontWeight: 700 }}>{p.name}</div>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {p.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td><span className="category-chip">{p.category}</span></td>
                          <td style={{ fontWeight: 800, color: "var(--accent)", fontFamily: "'Fredoka One', cursive" }}>${parseFloat(p.price).toFixed(2)}</td>
                          <td>
                            <span style={{
                              fontWeight: 700,
                              color: p.stock === 0 ? "var(--danger)" : p.stock <= 5 ? "var(--gold)" : "var(--accent)",
                              background: p.stock === 0 ? "rgba(229,57,53,0.1)" : p.stock <= 5 ? "rgba(245,127,23,0.1)" : "rgba(46,125,50,0.1)",
                              padding: "4px 10px", borderRadius: "20px", fontSize: "0.85rem"
                            }}>
                              {p.stock}
                            </span>
                          </td>
                          <td style={{ color: "var(--text-muted)" }}>{p.unit}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-end">
                              <button className="btn btn-sm btn-outline-accent" onClick={() => openEdit(p)} style={{ borderRadius: "8px", padding: "6px 14px" }}>
                                <i className="fas fa-edit me-1"></i>Editar
                              </button>
                              <button className="btn btn-sm btn-danger-soft" onClick={() => setDeleteConfirm(p)} style={{ borderRadius: "8px", padding: "6px 14px" }}>
                                <i className="fas fa-trash me-1"></i>Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                          🌱 No se encontraron productos
                        </td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tab === "cart" && (
            <>
              <h2 style={{ color: "var(--accent)", marginBottom: "8px" }}>Carrito activo 🛒</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
                {store.cart.length} productos · Total: ${cartTotal.toFixed(2)}
              </p>
              {store.cart.length === 0 ? (
                <div className="card-dark p-5 text-center">
                  <div style={{ fontSize: "4rem" }}>🛒</div>
                  <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>El carrito está vacío</p>
                </div>
              ) : (
                <div className="card-dark p-0" style={{ overflow: "hidden" }}>
                  <table className="table-verde">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio unit.</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img src={item.image_url} alt={item.name} style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }} />
                              <span style={{ fontWeight: 700 }}>{item.name}</span>
                            </div>
                          </td>
                          <td style={{ color: "var(--accent)", fontWeight: 700 }}>${parseFloat(item.price).toFixed(2)}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <button className="qty-btn" onClick={() => actions.updateCartQuantity(item.id, item.quantity - 1)}>−</button>
                              <span style={{ fontWeight: 700, minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                              <button className="qty-btn" onClick={() => actions.updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                          </td>
                          <td style={{ fontWeight: 800, color: "var(--accent)", fontFamily: "'Fredoka One', cursive" }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td>
                            <button className="btn btn-sm btn-danger-soft" onClick={() => actions.removeFromCart(item.id)}>
                              <i className="fas fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between align-items-center p-4" style={{ borderTop: "2px solid rgba(46,125,50,0.1)" }}>
                    <button className="btn btn-danger-soft" onClick={actions.clearCart}>
                      <i className="fas fa-trash me-2"></i>Vaciar carrito
                    </button>
                    <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", color: "var(--accent)" }}>
                      Total: ${cartTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal-box">
            <div style={{ padding: "24px", borderBottom: "1px solid rgba(46,125,50,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "var(--accent)" }}>
                {editProduct ? "✏️ Editar producto" : "🌱 Nuevo producto"}
              </h4>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--text-muted)", lineHeight: 1 }}>×</button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
              <div className="row g-3">
                <div className="col-12">
                  <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: "6px", display: "block" }}>Nombre *</label>
                  <input className="form-control-dark" placeholder="Ej: Tomate Perita" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="col-12">
                  <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: "6px", display: "block" }}>Descripción</label>
                  <textarea className="form-control-dark" rows={3} placeholder="Descripción del producto..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ resize: "vertical" }} />
                </div>
                <div className="col-6">
                  <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: "6px", display: "block" }}>Precio * ($)</label>
                  <input className="form-control-dark" type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="col-6">
                  <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: "6px", display: "block" }}>Stock</label>
                  <input className="form-control-dark" type="number" min="0" placeholder="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div className="col-6">
                  <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: "6px", display: "block" }}>Categoría</label>
                  <select className="form-select-dark" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-6">
                  <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: "6px", display: "block" }}>Unidad</label>
                  <select className="form-select-dark" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                    {UNITS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div className="col-12">
                  <label style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: "6px", display: "block" }}>URL de imagen</label>
                  <input className="form-control-dark" placeholder="https://..." value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                  {form.image_url && (
                    <img src={form.image_url} alt="preview" onError={(e) => e.target.style.display = "none"}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px", marginTop: "10px" }} />
                  )}
                </div>
              </div>
              <div className="d-flex gap-3 justify-content-end mt-4">
                <button type="button" className="btn btn-outline-accent" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-accent">
                  <i className={"fas me-2 " + (editProduct ? "fa-save" : "fa-plus")}></i>
                  {editProduct ? "Guardar cambios" : "Crear producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}>
          <div className="modal-box" style={{ maxWidth: "400px" }}>
            <div style={{ padding: "32px", textAlign: "center" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>🗑️</div>
              <h4 style={{ color: "var(--text)", marginBottom: "8px" }}>¿Eliminar producto?</h4>
              <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
                Vas a eliminar <strong>{deleteConfirm.name}</strong>. Esta acción no se puede deshacer.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-outline-accent" onClick={() => setDeleteConfirm(null)}>Cancelar</button>
                <button className="btn btn-danger-soft" style={{ background: "var(--danger)", color: "#fff" }} onClick={() => handleDelete(deleteConfirm.id)}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
