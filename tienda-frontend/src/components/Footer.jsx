import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ backgroundColor: "#0f3614", color: "rgba(255,255,255,0.7)", padding: "64px 0 32px", borderTop: "4px solid #1e5a26" }}>
    <div className="container">
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", color: "#ffffff", marginBottom: "16px" }}>
            🥦 La Verde
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "rgba(255,255,255,0.65)", maxWidth: "280px" }}>
            Del campo a tu puerta. Frutas y verduras frescas, orgánicas y de temporada con entrega en el día.
          </p>
        </div>
        <div className="col-md-4">
          <h6 style={{ color: "#a5d6a7", fontWeight: 800, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem" }}>
            Navegación
          </h6>
          <ul className="list-unstyled d-flex flex-column gap-2 m-0">
            {[{ to: "/", label: "Inicio" }, { to: "/cart", label: "Mi Canasta" }, { to: "/login", label: "Acceso Clientes" }, { to: "/signup", label: "Crear Cuenta" }].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.9rem" }}>
                  • {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h6 style={{ color: "#a5d6a7", fontWeight: 800, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem" }}>
            Contacto y Horarios
          </h6>
          <div className="d-flex flex-column gap-2" style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)" }}>
            <span className="d-flex align-items-center gap-2"><i className="fas fa-map-marker-alt" style={{ width: "16px", color: "#81c784" }}></i> Buenos Aires, Argentina</span>
            <span className="d-flex align-items-center gap-2"><i className="fas fa-phone" style={{ width: "16px", color: "#81c784" }}></i> +54 11 1234-5678</span>
            <span className="d-flex align-items-center gap-2"><i className="fas fa-envelope" style={{ width: "16px", color: "#81c784" }}></i> hola@laverde.com.ar</span>
            <span className="d-flex align-items-center gap-2"><i className="fas fa-clock" style={{ width: "16px", color: "#81c784" }}></i> Lun–Sáb 8hs a 18hs</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", textAlign: "center", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", fontWeight: "600" }}>
        © {new Date().getFullYear()} La Verde — Hecho con 💚 en Argentina
      </div>
    </div>
  </footer>
);

export default Footer;
