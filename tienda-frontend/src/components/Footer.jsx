import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ background: "#1b5e20", color: "#fff", padding: "60px 0 30px" }}>
    <div className="container">
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <h5 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: "#fff" }}>
            🥦 La Verde
          </h5>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: "1.7" }}>
            Tu verdulería de confianza. Productos frescos, directos del campo a tu mesa, todos los días.
          </p>
          <div className="d-flex gap-2 flex-wrap mt-2">
            {["🥕", "🥬", "🍅", "🥑", "🫑", "🍋"].map((e) => (
              <span key={e} style={{ fontSize: "1.5rem" }}>{e}</span>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h6 style={{ color: "#a5d6a7", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 700 }} className="mb-3">Navegación</h6>
          <ul className="list-unstyled">
            {[{ to: "/", label: "Inicio" }, { to: "/login", label: "Mi cuenta" }, { to: "/cart", label: "Mi canasta" }, { to: "/favorites", label: "Mis favoritos" }].map(({ to, label }) => (
              <li key={to} className="mb-2">
                <Link to={to} className="text-decoration-none" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <i className="fas fa-leaf me-2" style={{ color: "#81c784", fontSize: "0.7rem" }}></i>{label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h6 style={{ color: "#a5d6a7", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 700 }} className="mb-3">Horarios y contacto</h6>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}><i className="fas fa-clock me-2" style={{ color: "#81c784" }}></i>Lun–Sáb: 7:00 – 20:00</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}><i className="fas fa-map-marker-alt me-2" style={{ color: "#81c784" }}></i>Buenos Aires, Argentina</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}><i className="fas fa-phone me-2" style={{ color: "#81c784" }}></i>+54 11 1234-5678</p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}><i className="fas fa-truck me-2" style={{ color: "#81c784" }}></i>Envío gratis desde $5.000</p>
        </div>
      </div>
      <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", margin: "32px 0" }}></div>
      <div className="text-center" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
        © {new Date().getFullYear()} La Verde · Verdulería Online · Powered by <span style={{ color: "#81c784" }}>4Geeks Academy</span>
      </div>
    </div>
  </footer>
);

export default Footer;

