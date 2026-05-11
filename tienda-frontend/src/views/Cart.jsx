import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";

const Cart = () => {
  const { store, actions } = useContext(Context);
  const cart = store.cart || [];
  const total = cart.reduce((acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "70vh", background: "var(--primary)" }}>
        <div style={{ fontSize: "5rem" }}>🧺</div>
        <h3 style={{ color: "var(--accent)", marginTop: "1rem" }}>Tu canasta está vacía</h3>
        <p style={{ color: "var(--text-muted)" }}>Agregá frutas y verduras frescas para comenzar.</p>
        <Link to="/" className="btn btn-accent mt-3">Ver productos 🥬</Link>
      </div>
    );
  }

  return (
    <section className="page-section" style={{ background: "var(--primary)" }}>
      <div className="container">
        <h2 className="mb-1" style={{ color: "var(--accent)" }}>🧺 Mi canasta</h2>
        <p className="mb-5" style={{ color: "var(--text-muted)" }}>{cart.length} {cart.length === 1 ? "producto" : "productos"}</p>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item.id} className="card-dark p-3">
                  <div className="d-flex gap-3 align-items-center flex-wrap">
                    <img
                      src={item.image_url || "https://placehold.co/100x100/e8f5e9/2e7d32?text=🥦"}
                      alt={item.name}
                      style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "12px", flexShrink: 0 }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-bold" style={{ fontSize: "1rem", color: "var(--text)" }}>{item.name}</p>
                      <span className="category-chip">{item.category || "Verdura"}</span>
                      <div className="mt-1">
                        <span className="price-tag" style={{ fontSize: "1.2rem" }}>${parseFloat(item.price || 0).toFixed(2)}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "4px" }}>/ kg</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button className="qty-btn" onClick={() => item.quantity > 1 ? actions.updateCartItem(item.id, item.quantity - 1) : actions.removeFromCart(item.id)}>−</button>
                      <span style={{ width: "32px", textAlign: "center", fontWeight: 800, fontSize: "1.1rem", color: "var(--accent)" }}>{item.quantity || 1}</span>
                      <button className="qty-btn" onClick={() => actions.updateCartItem(item.id, (item.quantity || 1) + 1)}>+</button>
                    </div>
                    <button onClick={() => actions.removeFromCart(item.id)}
                      style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: "1.1rem", transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#e53935"}
                      onMouseLeave={e => e.target.style.color = "#ccc"}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card-dark p-4" style={{ position: "sticky", top: "100px" }}>
              <h5 className="mb-4 pb-3" style={{ borderBottom: "2px solid var(--surface-2)", color: "var(--accent)", fontFamily: "'Fredoka One', cursive", fontSize: "1.4rem" }}>
                🧾 Resumen
              </h5>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Subtotal</span>
                <span style={{ fontWeight: 700 }}>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Envío</span>
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>🚚 Gratis</span>
              </div>
              <div className="divider" style={{ margin: "16px 0" }}></div>
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>Total</span>
                <span className="price-tag" style={{ fontSize: "1.8rem" }}>${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-accent w-100 py-2" style={{ fontSize: "1rem" }}>
                <i className="fas fa-check me-2"></i> Confirmar pedido
              </button>
              <Link to="/" className="btn btn-outline-accent w-100 mt-3 py-2">
                Seguir comprando 🥕
              </Link>
              <p className="text-center mt-3 mb-0" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                🌿 Productos frescos garantizados
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

