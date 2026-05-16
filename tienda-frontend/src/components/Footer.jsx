import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ background: "#1b5e20", color: "rgba(255,255,255,0.8)", padding: "48px 0 24px" }}>
    <div className="container">
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8rem", color: "#fff", marginBottom: "12px" }}>
            🥦 La Verde
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "rgba(255,255,255,0.65)", maxWidth: "280px" }}>
            Del campo a tu puerta. Frutas y verduras frescas, orgánicas y de temporada con entrega en el día.
          </p>
        </div>
        <div className="col-md-4">
          <h6 style={{ color: "#a5d6a7", fontWeight: 700, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.8rem" }}>
            Navegación
          </h6>
          <ul className="list-unstyled" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[{ to: "/", label: "🏠 Inicio" }, { to: "/cart", label: "🛒 Carrito" }, { to: "/login", label: "🔐 Iniciar sesión" }, { to: "/signup", label: "✨ Registrarse" }].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.target.style.color = "#fff"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.7)"}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h6 style={{ color: "#a5d6a7", fontWeight: 700, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.8rem" }}>
            Contacto
          </h6>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
            <span>📍 Buenos Aires, Argentina</span>
            <span>📞 +54 11 1234-5678</span>
            <span>✉️ hola@laverde.com.ar</span>
            <span>⏰ Lun–Sáb 8hs a 18hs</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", textAlign: "center", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>
        © {new Date().getFullYear()} La Verde — Hecho con 💚 en Argentina
      </div>
    </div>
  </footer>
);

export default Footer;
