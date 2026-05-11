import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const { store } = useContext(Context);
  const favProducts = (store.favorites || [])
    .map((fav) => (store.products || []).find((p) => p.id === fav.product_id))
    .filter(Boolean);

  return (
    <section className="page-section" style={{ background: "var(--primary)" }}>
      <div className="container">
        <h2 className="mb-1" style={{ color: "var(--accent)" }}>❤️ Mis favoritos</h2>
        <p className="mb-5" style={{ color: "var(--text-muted)" }}>
          {favProducts.length} {favProducts.length === 1 ? "producto guardado" : "productos guardados"}
        </p>
        {favProducts.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
            <div style={{ fontSize: "5rem" }}>🥺</div>
            <h4 style={{ color: "var(--accent)", marginTop: "1rem" }}>Aún no tenés favoritos</h4>
            <p style={{ color: "var(--text-muted)" }}>Explorá nuestros productos y guardá los que más te gusten.</p>
            <Link to="/" className="btn btn-accent mt-3">Explorar productos 🥬</Link>
          </div>
        ) : (
          <div className="row g-4">
            {favProducts.map((p) => (
              <div key={p.id} className="col-sm-6 col-lg-4 col-xl-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;

