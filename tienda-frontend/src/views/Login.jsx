import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    actions.clearMessage();
  }, []);

  useEffect(() => {
    if (store.token) navigate("/");
  }, [store.token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (store.error) actions.clearMessage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = actions.login(form.email, form.password);
    setLoading(false);
    if (ok) navigate("/");
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: "var(--surface)" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "8px" }}>🥦</div>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2rem", marginBottom: "6px" }}>
            ¡Bienvenido de vuelta!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Ingresá a tu cuenta para continuar comprando
          </p>
        </div>

        <div className="card-dark p-4">
          {store.error && (
            <div style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.3)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#c62828", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fas fa-exclamation-circle"></i> {store.error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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

            <div className="mb-2">
              <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                className="form-control-dark"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div className="text-end mb-4">
              <Link to="/forgot-password" style={{ fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none" }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-accent w-100"
              disabled={loading}
              style={{ padding: "12px", fontSize: "1rem", fontWeight: 700 }}
            >
              {loading ? (
                <span><i className="fas fa-spinner fa-spin me-2"></i>Ingresando...</span>
              ) : (
                <span><i className="fas fa-sign-in-alt me-2"></i>Iniciar sesión</span>
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            ¿No tenés cuenta?{" "}
            <Link to="/signup" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
              Registrate gratis
            </Link>
          </div>

          <div style={{ marginTop: "20px", padding: "12px", background: "rgba(46,125,50,0.06)", borderRadius: "10px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
            💡 Demo: <strong>emanuel@gmail.com</strong> / <strong>12345</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
