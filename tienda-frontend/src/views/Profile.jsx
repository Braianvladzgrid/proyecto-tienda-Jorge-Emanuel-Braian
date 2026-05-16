import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const user = store.user;
  const cart = store.cart || [];
  const favorites = store.favorites || [];
  const cartCount = cart.reduce((acc, i) => acc + (i.quantity || 1), 0);
  const orderTotal = cart.reduce((acc, i) => acc + parseFloat(i.price || 0) * (i.quantity || 1), 0);

  // Obtener el perfil que corresponde a la sesión iniciada
  useEffect(() => { actions.getProfile(); }, []);

  const handleLogout = () => { actions.logout(); navigate("/"); };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-accent"></div>
      </div>
    );
  }

  const stats = [
    { icon: "🧺", label: "En canasta", value: cartCount },
    { icon: "❤️", label: "Favoritos", value: favorites.length },
    { icon: "💰", label: "Total canasta", value: "$" + orderTotal.toFixed(2) },
  ];

  return (
    <section className="page-section" style={{ background: "var(--primary)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="card-dark p-4 p-md-5 mb-4">
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "linear-gradient(135deg, #2e7d32, #81c784)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", flexShrink: 0 }}>
              🌿
            </div>
            <div>
              <h2 className="mb-1" style={{ color: "var(--accent)" }}>¡Hola, {user.name}! 👋</h2>
              <p className="mb-0" style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                <i className="fas fa-envelope me-2 text-accent"></i>{user.email}
              </p>
              {user.created_at && (
                <p className="mb-0 mt-1" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <i className="fas fa-calendar me-2 text-accent"></i>
                  Cliente desde {new Date(user.created_at).toLocaleDateString("es-AR", { year: "numeric", month: "long" })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          {stats.map(({ icon, label, value }) => (
            <div key={label} className="col-sm-4">
              <div className="card-dark p-4 text-center">
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{icon}</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "'Fredoka One', cursive", color: "var(--accent)" }}>{value}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-dark p-4">
          <h5 className="mb-4" style={{ color: "var(--accent)", fontFamily: "'Fredoka One', cursive" }}>Accesos rápidos</h5>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/cart" className="btn btn-outline-accent"><i className="fas fa-shopping-basket me-2"></i>Mi canasta</Link>
            <Link to="/favorites" className="btn btn-outline-accent"><i className="fas fa-heart me-2"></i>Mis favoritos</Link>
            <button className="btn btn-outline-accent" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Cerrar sesión</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

