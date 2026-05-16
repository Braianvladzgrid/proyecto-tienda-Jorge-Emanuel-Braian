import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const cartCount = store.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
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
            <li className="nav-item"><Link className="nav-link nav-link-custom" to="/">🏠 Inicio</Link></li>

            {/* Únicamente con cuenta abierta */}
            {store.token && (<>
              <li className="nav-item"><Link className="nav-link nav-link-custom" to="/favorites">❤️ Favoritos</Link></li>
              <li className="nav-item"><Link className="nav-link nav-link-custom" to="/profile">👤 Mi cuenta</Link></li>
            </>)}

          </ul>
          <div className="d-flex align-items-center gap-3">

            {store.token ? (<>
              {/* Con sesión abierta */}
              <p className="navbar-brand fw-bold" style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", color: "var(--accent)" }}>
                🥦 Hola, tú
              </p>
              <Link to="/cart" className="position-relative text-decoration-none" style={{ color: "var(--accent)" }}>
                <i className="fas fa-shopping-basket" style={{ fontSize: "1.4rem" }}></i>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <button className="btn btn-outline-accent btn-sm" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i> Salir
              </button>
            </>) : (<>
              {/* Con sesión cerrada */}
              <Link to="/login" className="btn btn-outline-accent btn-sm">Iniciar sesión</Link>
              <Link to="/signup" className="btn btn-accent btn-sm">Registrarse</Link>
            </>)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

