import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 350;

const Cart = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = store.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleOrder = async () => {
    setIsProcessing(true);
    const success = await actions.checkoutOrder();
    setIsProcessing(false);

    if (success) {
      setOrdered(true);
      setTimeout(() => {
        setOrdered(false);
        navigate("/");
      }, 3000);
    } else {
      alert("Hubo un problema al procesar tu compra. Por favor, reintent� m�s tarde.");
    }
  };

  if (ordered) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "40px" }}>
        <div style={{ fontSize: "5rem" }}>??</div>
        <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2.2rem" }}>
          �Pedido confirmado!
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
          Tu pedido fue recibido. Te avisamos cuando est� en camino ??
        </p>
        <div style={{ width: "40px", height: "4px", background: "var(--accent)", borderRadius: "2px", animation: "grow 3s linear forwards" }}></div>
      </div>
    );
  }

  if (store.cart.length === 0) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "40px" }}>
        <div style={{ fontSize: "5rem" }}>??</div>
        <h3 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)" }}>Tu carrito est� vac�o</h3>
        <p style={{ color: "var(--text-muted)" }}>Agreg� productos frescos desde nuestra tienda</p>
        <Link to="/" className="btn btn-accent" style={{ marginTop: "8px" }}>
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 0", background: "var(--surface)", minHeight: "80vh" }}>
      <div className="container">
        <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2.2rem", marginBottom: "8px" }}>
          ?? Tu carrito
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
          {store.cart.length} {store.cart.length === 1 ? "producto" : "productos"} en tu carrito
        </p>

        <div className="row g-4 align-items-start">
          <div className="col-lg-8">
            <div className="card-dark p-0" style={{ overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", background: "var(--surface-2)", borderBottom: "1px solid rgba(46,125,50,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, color: "var(--text)" }}>Productos</span>
                <button
                  onClick={() => actions.clearCart()}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  <i className="fas fa-trash me-1"></i>Vaciar carrito
                </button>
              </div>

              {store.cart.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderBottom: idx < store.cart.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    flexWrap: "wrap",
                  }}
                >
                  <img
                    src={item.image_url || "https://placehold.co/72x72/e8f5e9/2e7d32?text=??"}
                    alt={item.name}
                    style={{ width: "72px", height: "72px", objectFit: "cover", borderRadius: "12px", flexShrink: 0 }}
                  />

                  <div style={{ flex: 1, minWidth: "140px" }}>
                    <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "1rem" }}>{item.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.83rem", marginTop: "2px" }}>
                      {item.category} � ${parseFloat(item.price).toFixed(2)} / {item.unit}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", border: "2px solid rgba(46,125,50,0.2)", borderRadius: "10px", overflow: "hidden" }}>
                    <button
                      onClick={() => actions.updateCartQuantity(item.id, item.quantity - 1)}
                      style={{ width: "36px", height: "36px", border: "none", background: "var(--surface-2)", color: "var(--accent)", fontWeight: 700, cursor: "pointer" }}
                    >
                      -
                    </button>
                    <span style={{ width: "40px", textAlign: "center", fontWeight: 700, color: "var(--text)" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => actions.updateCartQuantity(item.id, item.quantity + 1)}
                      style={{ width: "36px", height: "36px", border: "none", background: "var(--surface-2)", color: "var(--accent)", fontWeight: 700, cursor: "pointer" }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ fontWeight: 800, color: "var(--accent)", fontSize: "1.05rem", minWidth: "80px", textAlign: "right" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => actions.removeFromCart(item.id)}
                    style={{ background: "rgba(229,57,53,0.1)", border: "none", color: "#e53935", borderRadius: "8px", width: "36px", height: "36px", cursor: "pointer", flexShrink: 0 }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "16px" }}>
              <Link to="/" style={{ color: "var(--accent)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
                <i className="fas fa-arrow-left me-2"></i>Seguir comprando
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card-dark p-4">
              <h5 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "1.3rem", marginBottom: "20px" }}>
                Resumen del pedido
              </h5>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  <span>Subtotal</span>
                  <span style={{ color: "var(--text)", fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  <span>Env�o</span>
                  <span style={{ color: shipping === 0 ? "var(--accent)" : "var(--text)", fontWeight: 600 }}>
                    {shipping === 0 ? "�GRATIS! ??" : "$" + shipping.toFixed(2)}
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ padding: "8px 12px", background: "rgba(46,125,50,0.08)", borderRadius: "8px", fontSize: "0.8rem", color: "var(--accent)" }}>
                    ?? Sum� ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} m�s para env�o gratis
                  </div>
                )}
              </div>

              <div style={{ borderTop: "2px solid rgba(46,125,50,0.15)", paddingTop: "16px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: "1.5rem", color: "var(--accent)" }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {store.token ? (
                <button
                  className="btn btn-accent w-100"
                  onClick={handleOrder}
                  disabled={isProcessing}
                  style={{ padding: "14px", fontSize: "1rem", fontWeight: 700 }}
                >
                  <i className={isProcessing ? "fas fa-spinner fa-spin me-2" : "fas fa-check-circle me-2"}></i>
                  {isProcessing ? "Procesando..." : "Finalizar compra"}
                </button>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="btn btn-accent w-100 mb-2"
                    style={{ padding: "14px", fontSize: "1rem", fontWeight: 700 }}
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>Iniciar sesi�n para comprar
                  </Link>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", marginBottom: 0 }}>
                    �No ten�s cuenta? <Link to="/signup" style={{ color: "var(--accent)" }}>Registrate gratis</Link>
                  </p>
                </div>
              )}

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "12px" }}>
                {["?? Pago seguro", "?? Fresco garantizado"].map((t) => (
                  <span key={t} style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;