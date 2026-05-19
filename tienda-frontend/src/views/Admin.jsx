import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Admin = () => {
  const { store, actions } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    unit: "pza",
    category: "Verduras",
    image_url: ""
  });

  const categories = ["Verduras", "Frutas", "Hierbas", "Condimentos", "Pecuarios", "Cítricos"];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const url = isEditing 
      ? `${process.env.BACKEND_URL}/api/products/${currentProduct.id}`
      : `${process.env.BACKEND_URL}/api/products`;
    
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: currentProduct.name,
          description: currentProduct.description,
          price: parseFloat(currentProduct.price),
          stock: parseInt(currentProduct.stock),
          unit: currentProduct.unit,
          category: currentProduct.category,
          image_url: currentProduct.image_url
        })
      });

      if (response.ok) {
        resetForm();
        loadProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: null,
      name: "",
      description: "",
      price: "",
      stock: "",
      unit: "pza",
      category: "Verduras",
      image_url: ""
    });
  };

  return (
    <div className="container py-5 app-wrapper">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="admin-card p-4">
            <h3 className="mb-4 font-weight-bold">
              {isEditing ? "Editar Producto" : "Nuevo Producto"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted">Nombre del Producto</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={currentProduct.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Categoría</label>
                <select
                  name="category"
                  className="form-select"
                  value={currentProduct.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label text-muted">Precio ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    className="form-control"
                    value={currentProduct.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label text-muted">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={currentProduct.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label text-muted">Unidad de Medida</label>
                  <input
                    type="text"
                    name="unit"
                    className="form-control"
                    placeholder="ej. kg, pza, atado"
                    value={currentProduct.unit}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">URL Imagen</label>
                <input
                  type="url"
                  name="image_url"
                  className="form-control"
                  value={currentProduct.image_url}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Descripción</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={currentProduct.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="d-flex gap-2 justify-content-end mt-4">
                {isEditing && (
                  <button type="button" className="btn-outline-accent" onClick={resetForm}>
                    Cancelar
                  </button>
                )}
                <button type="submit" className="btn-accent">
                  {isEditing ? "Guardar Cambios" : "Agregar Canasta"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <div className="admin-card p-4">
            <h3 className="mb-4 font-weight-bold">Inventario de Productos</h3>
            <div className="table-responsive">
              <table className="table-verde">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="font-weight-bold">{product.name}</td>
                      <td>
                        <span className="category-chip">{product.category}</span>
                      </td>
                      <td>${product.price} / {product.unit}</td>
                      <td>{product.stock}</td>
                      <td className="text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className="btn-outline-accent py-1 px-3"
                            onClick={() => handleEdit(product)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-accent py-1 px-3"
                            style={{ background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)" }}
                            onClick={() => handleDelete(product.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        No hay productos cargados en la canasta.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};