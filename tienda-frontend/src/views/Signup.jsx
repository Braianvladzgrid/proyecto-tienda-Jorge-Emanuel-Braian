import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    actions.clearMessage();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldError("");
    if (store.error) actions.clearMessage();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setFieldError("Las contraseñas no coinciden.");
      return;
    }
    if (form.password.length < 4) {
      setFieldError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }
    setLoading(true);
    const ok = actions.signup(form.firstName, form.lastName, form.email, form.password);
    setLoading(false);
    if (ok) navigate("/login");
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: "var(--surface)" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "8px" }}>🌱</div>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2rem", marginBottom: "6px" }}>
            Crear cuenta gratis
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Sumate a La Verde y empezá a comprar fresco
          </p>
        </div>

        <div className="card-dark p-4">
          {(store.error || fieldError) && (
            <div style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.3)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#c62828", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fas fa-exclamation-circle"></i> {fieldError || store.error}
            </div>
          )}

          {store.message && (
            <div style={{ background: "rgba(46,125,50,0.1)", border: "1px solid rgba(46,125,50,0.3)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "var(--accent)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fas fa-check-circle"></i> {store.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control-dark"
                  placeholder="Juan"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-6">
                <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control-dark"
                  placeholder="García"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control-dark"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="mb-3">
              <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                className="form-control-dark"
                placeholder="Mínimo 4 caracteres"
                value={form.password}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="mb-4">
              <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirm"
                className="form-control-dark"
                placeholder="Repetí tu contraseña"
                value={form.confirm}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-accent w-100"
              disabled={loading}
              style={{ padding: "12px", fontSize: "1rem", fontWeight: 700 }}
            >
              {loading ? (
                <span><i className="fas fa-spinner fa-spin me-2"></i>Creando cuenta...</span>
              ) : (
                <span><i className="fas fa-user-plus me-2"></i>Crear cuenta</span>
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
              Iniciá sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
