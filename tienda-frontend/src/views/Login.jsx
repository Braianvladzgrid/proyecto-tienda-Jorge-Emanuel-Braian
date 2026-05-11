import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => { if (store.token) navigate("/"); }, [store.token]);
  useEffect(() => { return () => actions.clearMessage(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await actions.login(form.email, form.password);
    if (ok) navigate("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "85vh", background: "var(--primary)" }}>
      <div style={{ width: "100%", maxWidth: "440px", padding: "0 1rem" }}>
        <div className="card-dark p-4 p-md-5">
          <div className="text-center mb-4">
            <div style={{ fontSize: "3.5rem" }}>🥦</div>
            <h2 className="mb-1" style={{ color: "var(--accent)" }}>¡Bienvenido de vuelta!</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Ingresá a tu cuenta de La Verde</p>
          </div>
          {store.error && <div className="alert-dark-danger mb-3"><i className="fas fa-exclamation-circle me-2"></i>{store.error}</div>}
          {store.message && <div className="alert-dark-success mb-3"><i className="fas fa-check-circle me-2"></i>{store.message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-600" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>Correo electrónico</label>
              <input type="email" className="form-control-dark" placeholder="tu@email.com" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>Contraseña</label>
                <Link to="/forgot-password" className="text-decoration-none text-accent" style={{ fontSize: "0.82rem", fontWeight: 600 }}>¿Olvidaste tu contraseña?</Link>
              </div>
              <input type="password" className="form-control-dark" placeholder="••••••••" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-accent w-100 py-2" style={{ fontSize: "1rem" }}>
              Ingresar 🌿
            </button>
          </form>
          <p className="text-center mt-4 mb-0" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            ¿No tenés cuenta?{" "}
            <Link to="/signup" className="text-accent text-decoration-none fw-bold">Registrate gratis</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

