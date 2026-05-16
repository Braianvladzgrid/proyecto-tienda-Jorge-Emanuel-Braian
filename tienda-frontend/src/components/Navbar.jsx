import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const cartCount = store.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartTotal = store.cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const handleLogout = () => { actions.logout(); navigate("/"); };

  return (
    <nav className="navbar navbar-expand-lg nav-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", color: "var(--accent)" }}>
          🥦 La Verde
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" style={{ color: "var(--accent)" }}>
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-1">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/">🏠 Inicio</Link>
            </li>
            {store.token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/favorites">❤️ Favoritos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/profile">👤 Mi cuenta</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {store.token ? (
              <>
                <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem", color: "var(--accent)" }}>
                  Hola, {store.user?.firstName} 👋
                </span>

                <div className="dropdown">
                  <button
                    className="btn position-relative p-2"
                    style={{ color: "var(--accent)", background: "transparent", border: "none" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-shopping-basket" style={{ fontSize: "1.4rem" }}></i>
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                        style={{ background: "var(--accent)", fontSize: "0.7rem", minWidth: "20px" }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>

                  <div
                    className="dropdown-menu dropdown-menu-end p-0 shadow-lg"
                    style={{ minWidth: "340px", border: "1px solid rgba(46,125,50,0.15)", borderRadius: "16px", overflow: "hidden" }}
                  >
                    <div style={{ background: "var(--accent)", padding: "12px 16px" }}>
                      <span style={{ color: "#fff", fontWeight: 700, fontFamily: "'Fredoka One', cursive", fontSize: "1.1rem" }}>
                        🛒 Mi carrito ({cartCount})
                      </span>
                    </div>

                    {store.cart.length === 0 ? (
                      <div className="text-center py-4 px-3">
                        <div style={{ fontSize: "2.5rem" }}>🛒</div>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "8px", marginBottom: 0 }}>
                          Tu carrito está vacío
                        </p>
                      </div>
                    ) : (
                      <>
                        <div style={{ maxHeight: "260px", overflowY: "auto" }}>
                          {store.cart.map((item) => (
                            <div
                              key={item.id}
                              className="d-flex align-items-center gap-2 px-3 py-2"
                              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                            >
                              <img
                                src={item.image_url || "https://placehold.co/48x48/e8f5e9/2e7d32?text=🥦"}
                                alt={item.name}
                                style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                              />
                              <div className="flex-grow-1 overflow-hidden">
                                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {item.name}
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                                  {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                                </div>
                              </div>
                              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <button
                                className="btn btn-sm p-0 ms-1"
                                style={{ color: "#e53935", lineHeight: 1, background: "transparent", border: "none" }}
                                onClick={() => actions.removeFromCart(item.id)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ))}
                        </div>

                        <div style={{ padding: "12px 16px", background: "var(--surface-2)", borderTop: "1px solid rgba(46,125,50,0.1)" }}>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span style={{ fontWeight: 600, color: "var(--text)" }}>Total</span>
                            <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--accent)" }}>
                              ${cartTotal.toFixed(2)}
                            </span>
                          </div>
                          <Link
                            to="/cart"
                            className="btn w-100"
                            style={{ background: "var(--accent)", color: "#fff", fontWeight: 700, borderRadius: "10px" }}
                          >
                            Ver carrito completo →
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button className="btn btn-outline-accent btn-sm" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i> Salir
                </button>
              </>
            ) : (
              <>
                <div className="position-relative">
                  <Link to="/cart" className="btn p-2" style={{ color: "var(--accent)", background: "transparent", border: "none" }}>
                    <i className="fas fa-shopping-basket" style={{ fontSize: "1.4rem" }}></i>
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                        style={{ background: "var(--accent)", fontSize: "0.7rem" }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
                <Link to="/login" className="btn btn-outline-accent btn-sm">Iniciar sesión</Link>
                <Link to="/signup" className="btn btn-accent btn-sm">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
