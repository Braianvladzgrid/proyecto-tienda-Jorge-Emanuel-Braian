import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../layout";

const ProductCard = ({ product }) => {
  const { store, actions } = useContext(Context);
  const isFav = store.favorites.some((f) => f.product_id === product.id);

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (store.token) actions.toggleFavorite(product.id);
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    actions.addToCart(product, 1);
  };

  return (
    <div className="card-dark h-100">
      <Link to={"/product/" + product.id} className="text-decoration-none d-flex flex-column h-100" style={{ color: "var(--text)" }}>
        <div className="position-relative overflow-hidden">
          <img
            src={product.image_url || "https://placehold.co/400x220/e8f5e9/2e7d32?text=🥦"}
            alt={product.name}
            className="product-img"
          />
          {store.token && (
            <button className={"fav-btn position-absolute top-0 end-0 m-2 " + (isFav ? "active" : "")} onClick={handleFav}>
              <i className={"fa" + (isFav ? "s" : "r") + " fa-heart"}></i>
            </button>
          )}
          {product.stock === 0 && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-danger">Sin stock</span>
            </div>
          )}
        </div>
        <div className="p-3 d-flex flex-column flex-grow-1">
          <span className="category-chip mb-2 d-inline-block">{product.category || "Otros"}</span>
          <h6 className="mb-1 fw-bold" style={{ fontSize: "1.05rem", color: "var(--text)" }}>{product.name}</h6>
          <p className="mb-3" style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.5", flexGrow: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {product.description}
          </p>
          <div className="d-flex align-items-center justify-content-between mt-auto">
            <div>
              <span className="price-tag">${parseFloat(product.price || 0).toFixed(2)}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "4px" }}>/ {product.unit || ""}</span>
            </div>
            <button
              className="btn btn-accent btn-sm"
              onClick={handleCart}
              disabled={product.stock === 0}
            >
              <i className="fas fa-plus me-1"></i> Agregar
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
