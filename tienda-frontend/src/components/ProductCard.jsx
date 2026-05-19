import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../layout";

const ProductCard = ({ product }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const isFav = store.favorites.some((f) => f.product_id === product.id);

  const handleFav = (e) => {
    e.stopPropagation();
    if (store.token) actions.toggleFavorite(product.id);
  };

  const handleCart = (e) => {
    e.stopPropagation();
    actions.addToCart(product, 1);
  };

  return (
    <div
      className="card-dark h-100 d-flex flex-column"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/product/" + product.id)}
    >
      <div className="position-relative overflow-hidden" style={{ backgroundColor: "#f5fbf5" }}>
        <img
          src={product.image_url || "https://placehold.co/400x220/e8f5e9/2e7d32?text=🥦"}
          alt={product.name}
          className="product-img"
        />
        {store.token && (
          <button
            className={"fav-btn position-absolute top-0 end-0 m-3 " + (isFav ? "active" : "")}
            onClick={handleFav}
            style={{ zIndex: 2 }}
          >
            <i className={(isFav ? "fas" : "far") + " fa-heart"}></i>
          </button>
        )}
        {product.stock === 0 && (
          <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 2 }}>
            <span className="badge bg-danger px-2 py-1 fw-bold" style={{ borderRadius: "6px", fontSize: "0.7rem", textTransform: "uppercase" }}>Sin stock</span>
          </div>
        )}
      </div>
      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="mb-2">
          <span className="category-chip">{product.category || "Otros"}</span>
        </div>
        <h6 className="mb-2 fw-bold" style={{ fontSize: "1.05rem", color: "#19201a", letterSpacing: "-0.2px" }}>
          {product.name}
        </h6>
        <p className="mb-3" style={{ fontSize: "0.85rem", color: "#627765", lineHeight: "1.5", flexGrow: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {product.description}
        </p>
        <div className="d-flex align-items-center justify-content-between pt-2 mt-auto" style={{ borderTop: "1px solid rgba(30,90,38,0.04)" }}>
          <div className="d-flex align-items-baseline gap-1">
            <span className="price-tag"></span>
            <span style={{ fontSize: "0.75rem", color: "#627765", fontWeight: "600" }}>
              / {product.unit || "kg"}
            </span>
          </div>
          <button
            className="btn btn-accent btn-sm d-flex align-items-center gap-1 py-2 px-3"
            style={{ borderRadius: "10px", fontSize: "0.82rem" }}
            onClick={handleCart}
            disabled={product.stock === 0}
          >
            <i className="fas fa-plus" style={{ fontSize: "0.75rem" }}></i> Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
