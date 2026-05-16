import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const { store } = useContext(Context);

  const favProducts = store.products.filter((p) =>
    store.favorites.some((f) => f.product_id === p.id)
  );

  return (
    <div style={{ padding: "40px 0", background: "var(--surface)", minHeight: "80vh" }}>
      <div className="container">
        <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "var(--accent)", fontSize: "2.2rem", marginBottom: "8px" }}>
          ❤️ Mis favoritos
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
          {favProducts.length} {favProducts.length === 1 ? "producto guardado" : "productos guardados"}
        </p>

        {favProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "5rem", marginBottom: "16px" }}>🤍</div>
            <h4 style={{ color: "var(--text)", marginBottom: "8px" }}>Aún no guardaste favoritos</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
              Presioná el ❤️ en cualquier producto para guardarlo acá
            </p>
            <Link to="/" className="btn btn-accent">
              Explorar productos
            </Link>
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
    </div>
  );
};

export default Favorites;
