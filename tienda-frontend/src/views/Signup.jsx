import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../layout";

const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [localError, setLocalError] = useState("");

  useEffect(() => { if (store.token) navigate("/"); }, [store.token]);
  useEffect(() => { return () => actions.clearMessage(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (form.password !== form.confirm) { setLocalError("Las contraseñas no coinciden."); return; }
    if (form.password.length < 6) { setLocalError("La contraseña debe tener al menos 6 caracteres."); return; }
    const ok = await actions.signup(form.name, form.email, form.password);
    if (ok) navigate("/login");
  };

  const fields = [
    { key: "name", label: "Nombre completo", type: "text", placeholder: "Juan García" },
    { key: "email", label: "Correo electrónico", type: "email", placeholder: "tu@email.com" },
    { key: "password", label: "Contraseña", type: "password", placeholder: "Mínimo 6 caracteres" },
    { key: "confirm", label: "Confirmar contraseña", type: "password", placeholder: "Repetí la contraseña" },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "85vh", background: "var(--primary)" }}>
      <div style={{ width: "100%", maxWidth: "460px", padding: "0 1rem" }}>
        <div className="card-dark p-4 p-md-5">
          <div className="text-center mb-4">
            <div style={{ fontSize: "3rem" }}>🌱</div>
            <h2 className="mb-1" style={{ color: "var(--accent)" }}>Creá tu cuenta</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Empezá a comprar fresco hoy mismo</p>
          </div>
          {(store.error || localError) && (
            <div className="alert-dark-danger mb-3"><i className="fas fa-exclamation-circle me-2"></i>{store.error || localError}</div>
          )}
          <form onSubmit={handleSubmit}>
            {fields.map(({ key, label, type, placeholder }) => (
              <div className="mb-3" key={key}>
                <label className="form-label" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>{label}</label>
                <input type={type} className="form-control-dark" placeholder={placeholder}
                  value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required />
              </div>
            ))}
            <button type="submit" className="btn btn-accent w-100 py-2 mt-2" style={{ fontSize: "1rem" }}>
              Crear cuenta 🥕
            </button>
          </form>
          <p className="text-center mt-4 mb-0" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-accent text-decoration-none fw-bold">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

