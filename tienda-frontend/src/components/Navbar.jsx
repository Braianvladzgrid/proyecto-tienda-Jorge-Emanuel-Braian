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
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.7rem", color: "#1e5a26" }}>
          <span>🥦</span> La Verde
        </Link>
        <button className="navbar-toggler border-0 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" style={{ color: "#1e5a26" }}>
          <i className="fas fa-bars" style={{ fontSize: "1.2rem" }}></i>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/">Inicio</Link>
            </li>
            {store.token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/favorites">Favoritos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link-custom" to="/profile">Mi cuenta</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {store.token ? (
              <>
                <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "#627765" }}>
                  Hola, <span style={{ color: "#1e5a26", fontFamily: "'Fredoka One', cursive" }}>{store.user?.firstName}</span>
                </span>

                <div className="dropdown">
                  <button
                    className="btn position-relative p-2 d-flex align-items-center justify-content-center"
                    style={{ color: "#1e5a26", backgroundColor: "#edf5ed", border: "none", width: "40px", height: "40px", borderRadius: "50%" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-shopping-basket" style={{ fontSize: "1.1rem" }}></i>
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill d-flex align-items-center justify-content-center shadow-sm"
                        style={{ backgroundColor: "#1e5a26", fontSize: "0.68rem", width: "20px", height: "20px", fontWeight: "800", padding: 0 }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>

                  <div
                    className="dropdown-menu dropdown-menu-end p-0 shadow-lg border-0"
                    style={{ minWidth: "340px", borderRadius: "20px", overflow: "hidden", backgroundColor: "#ffffff" }}
                  >
                    <div className="d-flex align-items-center justify-content-between" style={{ backgroundColor: "#1e5a26", padding: "16px 20px" }}>
                      <span style={{ color: "#ffffff", fontWeight: 700, fontFamily: "'Fredoka One', cursive", fontSize: "1.05rem" }}>
                        Canasta ({cartCount})
                      </span>
                    </div>

                    {store.cart.length === 0 ? (
                      <div className="text-center py-4 px-3">
                        <div style={{ fontSize: "2rem" }}>🧺</div>
                        <p style={{ color: "#627765", fontSize: "0.85rem", marginTop: "8px", marginBottom: 0, fontWeight: "600" }}>
                          Tu canasta está vacía
                        </p>
                      </div>
                    ) : (
                      <>
                        <div style={{ maxHeight: "260px", overflowY: "auto" }} className="py-1">
                          {store.cart.map((item) => (
                            <div
                              key={item.id}
                              className="d-flex align-items-center gap-3 px-3 py-2"
                              style={{ borderBottom: "1px solid rgba(30,90,38,0.05)" }}
                            >
                              <img
                                src={item.image_url || "https://placehold.co/48x48/e8f5e9/2e7d32?text=🥦"}
                                alt={item.name}
                                style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }}
                              />
                              <div className="flex-grow-1 overflow-hidden">
                                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#19201a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {item.name}
                                </div>
                                <div style={{ fontSize: "0.8rem", color: "#627765", fontWeight: "600" }}>
                                  {item.quantity} x 
                                </div>
                              </div>
                              <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1e5a26", flexShrink: 0 }}>
                                
                              </div>
                              <button
                                className="btn btn-sm p-1 d-flex align-items-center justify-content-center"
                                style={{ color: "rgba(0,0,0,0.25)", backgroundColor: "transparent", border: "none" }}
                                onClick={(e) => { e.stopPropagation(); actions.removeFromCart(item.id); }}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ))}
                        </div>

                        <div style={{ padding: "16px 20px", backgroundColor: "#f5fbf5", borderTop: "1px solid rgba(30,90,38,0.05)" }}>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span style={{ fontWeight: 700, color: "#627765", fontSize: "0.85rem" }}>TOTAL</span>
                            <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "#1e5a26" }}>
                              
                            </span>
                          </div>
                          <Link
                            to="/cart"
                            className="btn btn-accent w-100 py-2"
                            style={{ borderRadius: "12px", fontSize: "0.9rem" }}
                          >
                            Ver mi pedido →
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button className="btn btn-outline-accent btn-sm py-2 px-3" onClick={handleLogout}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-accent btn-sm py-2 px-3">Ingresar</Link>
                <Link to="/signup" className="btn btn-accent btn-sm py-2 px-3">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
