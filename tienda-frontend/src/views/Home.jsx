import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => { actions.getProducts(); }, []);

  const categories = ["Todos", ...new Set((store.products || []).map((p) => p.category).filter(Boolean))];

  const filtered = (store.products || []).filter((p) => {
    const matchCat = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <section className="hero-section">
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge-accent mb-3" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                ?? Cosecha fresca cada mañana
              </span>
              <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.8rem)", lineHeight: "1.1", fontWeight: 900, color: "#fff", marginTop: "1rem" }}>
                Frutas y verduras<br /><span style={{ color: "#a5d6a7" }}>del campo</span><br />a tu puerta ??
              </h1>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", maxWidth: "480px", marginTop: "1rem", lineHeight: "1.8" }}>
                Productos frescos, orgánicos y de temporada. Directo del productor, con entrega en el día.
              </p>
              <div className="d-flex gap-3 mt-4 flex-wrap">
                <a href="#productos" className="btn btn-accent" style={{ background: "#fff", color: "var(--accent)" }}>
                  Ver productos ??
                </a>
                {!store.token && (
                  <Link to="/signup" className="btn btn-outline-accent" style={{ borderColor: "#fff", color: "#fff" }}>
                    Crear cuenta gratis
                  </Link>
                )}
              </div>
              <div className="d-flex gap-4 mt-5 flex-wrap">
                {[{ icon: "??", label: "Envío gratis", sub: "desde $5.000" }, { icon: "?", label: "Entrega el mismo día", sub: "Pedís antes de las 12hs" }, { icon: "??", label: "100% fresco", sub: "Garantizado" }].map(({ icon, label, sub }) => (
                  <div key={label} style={{ color: "#fff" }}>
                    <div style={{ fontSize: "1.5rem" }}>{icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{label}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <div style={{ fontSize: "11rem", lineHeight: 1, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))", textAlign: "center" }}>
                ??
                <div style={{ fontSize: "5rem", marginTop: "-1rem" }}>?? ?? ??</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface-2)", padding: "24px 0", borderBottom: "1px solid rgba(46,125,50,0.1)" }}>
        <div className="container">
          <div className="d-flex justify-content-center gap-5 flex-wrap">
            {[{ emoji: "??", name: "Verduras" }, { emoji: "??", name: "Frutas" }, { emoji: "??", name: "Hierbas" }, { emoji: "??", name: "Condimentos" }, { emoji: "??", name: "Pecuarios" }, { emoji: "??", name: "Cítricos" }].map(({ emoji, name }) => (
              <div key={name} className="text-center" style={{ cursor: "pointer" }} onClick={() => setActiveCategory(name)}>
                <div style={{ fontSize: "2rem" }}>{emoji}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)" }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" id="productos">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 gap-3">
            <div>
              <h2 className="mb-1" style={{ color: "var(--accent)" }}>Nuestra canasta ??</h2>
              <p style={{ color: "var(--text-muted)" }}>{filtered.length} productos frescos disponibles</p>
            </div>
            <div className="position-relative">
              <i className="fas fa-search position-absolute" style={{ left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", zIndex: 1 }}></i>
              <input
                type="text"
                className="form-control-dark"
                placeholder="Buscar tomate, lechuga..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "44px", minWidth: "280px" }}
              />
            </div>
          </div>

          <div className="d-flex gap-2 flex-wrap mb-5">
            {categories.map((cat) => (
              <button key={cat} className={"filter-pill " + (activeCategory === cat ? "active" : "")} onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          {store.loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-accent"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "4rem" }}>??</div>
              <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>No se encontraron productos.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map((p) => (
                <div key={p.id} className="col-sm-6 col-lg-4 col-xl-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "#1b5e20", color: "#fff", padding: "60px 0" }}>
        <div className="container text-center">
          <h2 style={{ color: "#fff", fontSize: "2.2rem" }}>¿Por qué elegirnos? ??</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "3rem" }}>Más de 10 años llevando frescura a tu mesa</p>
          <div className="row g-4">
            {[
              { icon: "??", title: "Orgánico y natural", desc: "Sin pesticidas ni conservantes. Directamente del productor." },
              { icon: "??", title: "Entrega rápida", desc: "Pedís antes de las 12hs y recibís el mismo día en CABA." },
              { icon: "?", title: "Calidad garantizada", desc: "Si no estás conforme, te devolvemos el dinero sin preguntas." },
              { icon: "??", title: "Precio justo", desc: "Pagás lo que vale, sin intermediarios." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="col-sm-6 col-lg-3">
                <div style={{ padding: "2rem", background: "rgba(255,255,255,0.07)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{icon}</div>
                  <h5 style={{ color: "#fff", fontFamily: "'Fredoka One', cursive" }}>{title}</h5>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", marginBottom: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

