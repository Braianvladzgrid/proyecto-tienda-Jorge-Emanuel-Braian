import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!store.token) { navigate("/login"); return; }
    if (store.user) setForm({ firstName: store.user.firstName || "", lastName: store.user.lastName || "", email: store.user.email || "" });
    actions.clearMessage();
  }, [store.token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const cartCount = store.cart.reduce((acc, i) => acc + i.quantity, 0);
  const favCount = store.favorites.length;
  const cartTotal = store.cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div style={{ padding: "40px 0", background: "var(--surface)", minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2.2rem", marginBottom: "8px" }}>
          👤 Mi perfil
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
          Gestioná tu información personal
        </p>

        <div className="row g-4 mb-4">
          {[
            { icon: "🛒", label: "Productos en carrito", value: cartCount },
            { icon: "❤️", label: "Favoritos guardados", value: favCount },
            { icon: "💚", label: "Total en carrito", value: "$" + cartTotal.toFixed(2) },
          ].map(({ icon, label, value }) => (
            <div key={label} className="col-4">
              <div className="card-dark p-3 text-center">
                <div style={{ fontSize: "2rem", marginBottom: "4px" }}>{icon}</div>
                <div style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--accent)" }}>{value}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-dark p-4">
          <h5 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "24px" }}>
            Datos personales
          </h5>

          {saved && (
            <div style={{ background: "rgba(46,125,50,0.1)", border: "1px solid rgba(46,125,50,0.3)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "var(--accent)", fontSize: "0.9rem" }}>
              <i className="fas fa-check-circle me-2"></i>Perfil actualizado con éxito
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control-dark"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-md-6">
                <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control-dark"
                  value={form.lastName}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control-dark"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="d-flex gap-3 flex-wrap">
              <button
                type="submit"
                className="btn btn-accent"
                style={{ padding: "10px 28px", fontWeight: 700 }}
              >
                <i className="fas fa-save me-2"></i>Guardar cambios
              </button>
              <button
                type="button"
                className="btn btn-outline-accent"
                onClick={() => { actions.logout(); navigate("/"); }}
                style={{ padding: "10px 20px" }}
              >
                <i className="fas fa-sign-out-alt me-2"></i>Cerrar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
