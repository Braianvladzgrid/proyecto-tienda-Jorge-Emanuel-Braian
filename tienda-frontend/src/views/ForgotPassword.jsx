import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";

const ForgotPassword = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => { return () => actions.clearMessage(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await actions.forgotPassword(email);
    if (ok) setSent(true);
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "80vh", background: "var(--primary)" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 1rem" }}>
        <div className="card-dark p-4 p-md-5">
          <div className="text-center mb-4">
            <div style={{ fontSize: "3rem" }}>🔑</div>
            <h2 className="mb-1" style={{ color: "var(--accent)" }}>Recuperar contraseña</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Te enviamos un correo con instrucciones</p>
          </div>
          {store.error && <div className="alert-dark-danger mb-3"><i className="fas fa-exclamation-circle me-2"></i>{store.error}</div>}
          {sent ? (
            <div className="text-center py-3">
              <div className="alert-dark-success mb-4"><i className="fas fa-envelope me-2"></i>{store.message}</div>
              <Link to="/login" className="btn btn-accent"><i className="fas fa-arrow-left me-2"></i>Volver al login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>Correo electrónico</label>
                <input type="email" className="form-control-dark" placeholder="tu@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-accent w-100 py-2">
                Enviar instrucciones <i className="fas fa-paper-plane ms-2"></i>
              </button>
            </form>
          )}
          <p className="text-center mt-4 mb-0">
            <Link to="/login" className="text-accent text-decoration-none" style={{ fontSize: "0.9rem", fontWeight: 600 }}>← Volver al login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

