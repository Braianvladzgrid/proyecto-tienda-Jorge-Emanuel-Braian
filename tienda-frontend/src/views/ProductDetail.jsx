import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../layout";

const ProductDetail = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    actions.getProduct(id);
    window.scrollTo(0, 0);
  }, [id]);

  const product = store.product;

  const handleAdd = () => {
    actions.addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product || !product.id) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <div style={{ fontSize: "4rem" }}>🌱</div>
        <p style={{ color: "var(--text-muted)" }}>Cargando producto...</p>
      </div>
    );
  }

  const related = store.products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ padding: "40px 0", background: "var(--surface)" }}>
      <div className="container">
        <nav style={{ marginBottom: "28px" }}>
          <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Inicio</Link>
          <span style={{ color: "var(--text-muted)", margin: "0 8px" }}>/</span>
          <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>{product.category}</Link>
          <span style={{ color: "var(--text-muted)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--accent)", fontSize: "0.9rem", fontWeight: 600 }}>{product.name}</span>
        </nav>

        <div className="row g-5 align-items-start">
          <div className="col-md-5">
            <div style={{ borderRadius: "20px", overflow: "hidden", background: "var(--surface-2)", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={product.image_url || "https://placehold.co/500x500/e8f5e9/2e7d32?text=🥦"}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-7">
            <span className="category-chip mb-3 d-inline-block">{product.category}</span>
            <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2.4rem", color: "var(--text)", marginBottom: "12px", lineHeight: "1.2" }}>
              {product.name}
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "24px" }}>
              {product.description}
            </p>

            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
              <span className="price-tag" style={{ fontSize: "2.2rem" }}>
                ${parseFloat(product.price || 0).toFixed(2)}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>por {product.unit}</span>
            </div>

            <div style={{ marginBottom: "28px" }}>
              {product.stock > 0 ? (
                <span style={{ background: "rgba(46,125,50,0.1)", color: "var(--accent)", fontWeight: 600, fontSize: "0.85rem", padding: "4px 12px", borderRadius: "20px" }}>
                  ✅ Stock disponible: {product.stock} {product.unit}
                </span>
              ) : (
                <span style={{ background: "rgba(229,57,53,0.1)", color: "#c62828", fontWeight: 600, fontSize: "0.85rem", padding: "4px 12px", borderRadius: "20px" }}>
                  ❌ Sin stock
                </span>
              )}
            </div>

            {product.stock > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", border: "2px solid rgba(46,125,50,0.2)", borderRadius: "12px", overflow: "hidden" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: "44px", height: "44px", border: "none", background: "var(--surface-2)", color: "var(--accent)", fontWeight: 700, fontSize: "1.2rem", cursor: "pointer" }}
                  >
                    −
                  </button>
                  <span style={{ width: "48px", textAlign: "center", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    style={{ width: "44px", height: "44px", border: "none", background: "var(--surface-2)", color: "var(--accent)", fontWeight: 700, fontSize: "1.2rem", cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-accent"
                  onClick={handleAdd}
                  style={{ padding: "10px 28px", fontSize: "1rem", fontWeight: 700, flex: 1, minWidth: "180px", transition: "all 0.3s" }}
                >
                  {added ? (
                    <span><i className="fas fa-check me-2"></i>¡Agregado!</span>
                  ) : (
                    <span><i className="fas fa-shopping-basket me-2"></i>Agregar al carrito</span>
                  )}
                </button>
              </div>
            )}

            <div style={{ marginTop: "32px", padding: "20px", background: "var(--surface-2)", borderRadius: "14px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[{ icon: "🚚", text: "Envío el mismo día" }, { icon: "🌿", text: "Producto fresco" }, { icon: "✅", text: "Calidad garantizada" }].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <h3 style={{ color: "var(--accent)", fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", marginBottom: "24px" }}>
              También te puede gustar 🛒
            </h3>
            <div className="row g-4">
              {related.map((p) => (
                <div key={p.id} className="col-sm-6 col-lg-3">
                  <Link to={"/product/" + p.id} className="text-decoration-none">
                    <div className="card-dark p-0 h-100" style={{ cursor: "pointer" }}>
                      <img
                        src={p.image_url || "https://placehold.co/300x200/e8f5e9/2e7d32?text=🥦"}
                        alt={p.name}
                        className="product-img"
                      />
                      <div className="p-3">
                        <h6 style={{ color: "var(--text)", fontWeight: 700 }}>{p.name}</h6>
                        <span className="price-tag">${parseFloat(p.price).toFixed(2)}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "4px" }}>/ {p.unit}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
