import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../layout";

const ProductDetail = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => { actions.getProduct(id); }, [id]);

  const p = store.product;
  const isFav = store.favorites.some((f) => f.product_id === parseInt(id));

  const handleCart = async () => {
    const ok = await actions.addToCart(p.id, qty);
    if (ok) { setAdded(true); setTimeout(() => setAdded(false), 2500); }
  };

  if (store.loading || !p) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-accent"></div>
      </div>
    );
  }

  return (
    <section className="page-section" style={{ background: "var(--primary)" }}>
      <div className="container">

        <button onClick={() => navigate(-1)} className="btn btn-outline-accent btn-sm mb-4">
          <i className="fas fa-arrow-left me-2"></i> Volver
        </button>
        <div className="row g-5 align-items-start">
          <div className="col-md-6">
            <div className="card-dark p-0 overflow-hidden">
              <img
                src={p.image_url || "https://placehold.co/600x500/e8f5e9/2e7d32?text=🥦"}
                alt={p.name}
                style={{ width: "100%", height: "460px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <span className="category-chip mb-3 d-inline-block">{p.category || "Otros"}</span>
            <h1 style={{ fontSize: "2.8rem", lineHeight: "1.1", color: "var(--accent)" }}>{p.name}</h1>
            <div className="d-flex align-items-center gap-3 my-3">
              <span className="price-tag" style={{ fontSize: "2.5rem" }}>${parseFloat(p.price || 0).toFixed(2)}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>/ {p.unit}</span>
              {p.stock > 0
                ? <span className="badge" style={{ background: "#e8f5e9", color: "#2e7d32", fontWeight: 700, padding: "6px 14px", borderRadius: "50px", border: "1px solid rgba(46,125,50,0.3)" }}>✅ En stock ({p.stock} {p.unit})</span>
                : <span className="badge bg-danger">Sin stock</span>
              }
            </div>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1rem" }}>{p.description}</p>
            <div className="divider"></div>
            {added && <div className="alert-dark-success mb-3"><i className="fas fa-check-circle me-2"></i>Producto agregado a tu canasta 🧺</div>}
            <div className="d-flex align-items-center gap-3 mb-4">
              <span style={{ fontWeight: 700, color: "var(--text-muted)" }}>Cantidad ({p.unit}):</span>
              <div className="d-flex align-items-center gap-2">
                <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span style={{ width: "36px", textAlign: "center", fontWeight: 800, fontSize: "1.1rem", color: "var(--accent)" }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty((q) => Math.min(p.stock || 99, q + 1))}>+</button>
              </div>
            </div>
            <div className="d-flex gap-3 flex-wrap">
              {store.token ? (<>
                <button className="btn btn-accent" onClick={handleCart} disabled={p.stock === 0} style={{ fontSize: "1rem", padding: "12px 28px" }}>
                  🧺 Agregar a la canasta
                </button>
                <button
                  className={"fav-btn d-flex align-items-center gap-2 px-3 py-2 " + (isFav ? "active" : "")}
                  style={{ background: isFav ? "#fff0f0" : "var(--surface-2)", color: isFav ? "#e53935" : "var(--text-muted)", border: "2px solid " + (isFav ? "#e53935" : "rgba(46,125,50,0.2)"), borderRadius: "50px", fontWeight: 700 }}
                  onClick={() => actions.toggleFavorite(p.id)}>
                  <i className={"fa" + (isFav ? "s" : "r") + " fa-heart"}></i>
                  {isFav ? "Guardado" : "Guardar"}
                </button>
              </>) : (
                <Link to="/login" className="btn btn-accent" style={{ fontSize: "1rem" }}>
                  <i className="fas fa-lock me-2"></i> Iniciá sesión para comprar
                </Link>
              )}
            </div>
            <div className="mt-4 p-3" style={{ background: "var(--surface-2)", borderRadius: "12px", border: "1px solid rgba(46,125,50,0.15)" }}>
              <div className="d-flex gap-4 flex-wrap">
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>🚚 Envío gratis desde $5.000</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>🌿 Producto fresco y natural</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>⏰ Entrega el mismo día</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

