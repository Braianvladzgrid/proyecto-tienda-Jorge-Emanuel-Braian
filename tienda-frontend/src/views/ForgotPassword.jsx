import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";

const ForgotPassword = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    actions.clearMessage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const ok = await actions.forgotPassword(email);
    setIsSending(false);
    if (ok) setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: "var(--surface)" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "8px" }}>??</div>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2rem", marginBottom: "6px" }}>
            Recuperar contraseña
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Ingresá tu email y te enviamos un enlace para restablecer tu contraseña
          </p>
        </div>

        <div className="card-dark p-4">
          {store.error && (
            <div style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.3)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#c62828", fontSize: "0.9rem" }}>
              <i className="fas fa-exclamation-circle me-2"></i>{store.error}
            </div>
          )}

          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>??</div>
              <h5 style={{ color: "var(--accent)", fontWeight: 700, marginBottom: "8px" }}>¡Email enviado!</h5>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "20px" }}>
                Revisá tu bandeja de entrada en <strong>{email}</strong> y seguí el enlace para restablecer tu contraseña.
              </p>
              <Link to="/login" className="btn btn-accent w-100" style={{ fontWeight: 700 }}>
                Volver al inicio de sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: "6px", display: "block" }}>
                  Email de tu cuenta
                </label>
                <input
                  type="email"
                  className="form-control-dark"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (store.error) actions.clearMessage(); }}
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-accent w-100"
                disabled={isSending}
                style={{ padding: "12px", fontSize: "1rem", fontWeight: 700 }}
              >
                <i className={isSending ? "fas fa-spinner fa-spin me-2" : "fas fa-paper-plane me-2"}></i>
                {isSending ? "Enviando..." : "Enviar enlace de recuperación"}
              </button>
            </form>
          )}

          {!submitted && (
            <div style={{ textAlign: "center", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                <i className="fas fa-arrow-left me-1"></i>Volver al login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;