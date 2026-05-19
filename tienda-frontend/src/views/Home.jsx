import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";

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
    <div style={{ background: "var(--surface)", minHeight: "100vh", color: "var(--text)" }}>
      <div style={{ padding: "80px 0 40px 0", background: "linear-gradient(180deg, rgba(46,125,50,0.02) 0%, rgba(255,255,255,0) 100%)" }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 text-start">
              <span style={{ background: "rgba(46,125,50,0.1)", color: "var(--accent)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600, display: "inline-block", marginBottom: "20px" }}>
                🌱 Cosecha fresca cada mañana
              </span>

              <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "4.8rem", fontWeight: "700", lineHeight: "1.1", marginBottom: "24px" }}>
                Frutas y verduras <br />
                <span style={{ color: "var(--accent)" }}>del campo</span> <br />
                a tu puerta <span style={{ display: "inline-block", fontSize: "4.5rem", verticalAlign: "middle" }}>🥬</span>
              </h1>

              <p style={{ color: "var(--text-muted)", fontSize: "1.15rem", maxWidth: "520px", marginBottom: "36px", lineHeight: "1.5" }}>
                Productos frescos, orgánicos y de temporada. Directo del productor, con entrega en el día.
              </p>

              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <a href="#canasta" className="btn btn-accent" style={{ padding: "12px 24px", borderRadius: "8px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  Ver productos 🛒
                </a>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div style={{ position: "relative", width: "100%", height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "12rem", position: "absolute", zIndex: 1, transform: "translate(30px, -20px)", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.25))" }}>
                  🥦
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "absolute", zIndex: 2, transform: "translate(-110px, 10px)" }}>
                  <div style={{ fontSize: "5rem", filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.2))" }}>
                    🥑
                  </div>
                  <div style={{ fontSize: "5rem", filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.2))" }}>
                    🍅
                  </div>
                  <div style={{ fontSize: "5.5rem", filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.2))", transform: "rotate(-15deg)" }}>
                    🥕
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 text-start" style={{ marginTop: "40px" }}>
            <div className="col-md-4">
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "1.6rem" }}>🚚</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>Envío gratis</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>desde $5.000</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "1.6rem" }}>⏰</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>Entrega el mismo día</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Pedís antes de las 12hs</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "1.6rem" }}>🌿</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>100% fresco</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Garantizado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 0", background: "rgba(255,255,255,0.01)" }}>
        <div className="container d-flex justify-content-center gap-5 align-items-center flex-wrap" style={{ fontSize: "1.4rem" }}>
          {[{ emoji: "🥬", name: "Verduras" }, { emoji: "🍎", name: "Frutas" }, { emoji: "🌿", name: "Hierbas" }, { emoji: "🫚", name: "Condimentos" }, { emoji: "🥚", name: "Pecuarios" }].map(({ emoji, name }) => (
            <div key={name} className="text-center" style={{ cursor: "pointer" }} onClick={() => setActiveCategory(name)}>
              <div style={{ fontSize: "2rem" }}>{emoji}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)" }}>{name}</div>
            </div>
          ))}
          {/* <span>🥬</span>
          <span>🍎</span>
          <span>🌿</span>
          <span>🫚</span>
          <span>🥚</span>
          <span>🍋</span> */}
        </div>
      </div>

      <div id="canasta" className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div className="text-start">
            <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2.4rem", marginBottom: "4px" }}>
              Nuestra canasta 🧺
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
              {store.products ? store.products.length : 0} productos frescos disponibles
            </p>
          </div>

          <div style={{ position: "relative", minWidth: "300px" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control-dark ps-5"
              placeholder="Buscar tomate, lechuga..."
              style={{ paddingLeft: "40px", borderRadius: "10px", width: "100%", height: "42px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "40px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button key={cat} className={"btn btn-sm " + (activeCategory === cat ? "btn-accent" : "btn-dark")} onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
          {/* {["Todos", "Frutas", "Verduras", "Pecuarios", "Hierbas"].map((cat, i) => (
            <button
              key={cat}
              className={`btn btn-sm ${i === 0 ? "btn-accent" : "btn-dark"}`}
              style={{ borderRadius: "20px", padding: "6px 18px", fontWeight: 600 }}
            >
              {cat}
            </button>
          ))} */}
        </div>

        <div className="row g-4 text-start">
          {/* {store.products && store.products.map((item) => ( */}
          {filtered.map((item) => (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
              <div className="card-dark h-100 style-card" style={{ borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", paddingTop: "75%", background: "var(--surface-2)" }}>
                  <Link to={"/product/" + item.id} className="text-decoration-none d-flex flex-column h-100" style={{ color: "var(--text)" }}>
                    <img
                      src={item.image_url || "https://placehold.co/400x300/e8f5e9/2e7d32?text=🥬"}
                      alt={item.name}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span style={{ position: "absolute", top: "12px", left: "12px", background: "var(--accent)", color: "#ffffff", padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 600 }}>
                      {item.category}
                    </span>
                  </Link>
                  <button style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.4)", border: "none", color: "#ffffff", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <i className="far fa-heart"></i>
                  </button>
                </div>

                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <Link to={"/product/" + item.id} className="text-decoration-none d-flex flex-column h-100" style={{ color: "var(--text)" }}>
                      <h5 style={{ fontWeight: 700, marginBottom: "6px", fontSize: "1.15rem" }}>{item.name}</h5>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "16px" }}>{item.description}</p>
                    </Link>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--accent)" }}>${item.price}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}> / {item.unit}</span>
                    </div>
                    <button
                      className="btn btn-accent btn-sm"
                      onClick={() => actions.addToCart(item)}
                      style={{ borderRadius: "8px", padding: "6px 12px", fontWeight: 600 }}
                    >
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Home;