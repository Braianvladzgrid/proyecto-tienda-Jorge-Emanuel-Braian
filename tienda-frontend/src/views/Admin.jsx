import React, { useState, useEffect } from "react";

export const Admin = () => {
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

  const categories = ["Verduras", "Frutas", "Hierbas", "Condimentos", "Pecuarios", "C\u00edtricos"];

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
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-header__title">Panel de administraci\u00f3n</h1>
          <p className="page-header__subtitle">Gestion\u00e1 el inventario de La Verde</p>
        </header>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="ui-panel p-4">
              <h3 className="mb-4 fw-bold">
                {isEditing ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="ui-label">Nombre del Producto</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control-dark"
                    value={currentProduct.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="ui-label">Categor\u00eda</label>
                  <select
                    name="category"
                    className="form-control-dark"
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
                    <label className="ui-label">Precio ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      className="form-control-dark"
                      value={currentProduct.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="ui-label">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      className="form-control-dark"
                      value={currentProduct.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label className="ui-label">Unidad de Medida</label>
                    <input
                      type="text"
                      name="unit"
                      className="form-control-dark"
                      placeholder="ej. kg, pza, atado"
                      value={currentProduct.unit}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="ui-label">URL Imagen</label>
                  <input
                    type="url"
                    name="image_url"
                    className="form-control-dark"
                    value={currentProduct.image_url}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="ui-label">Descripci\u00f3n</label>
                  <textarea
                    name="description"
                    className="form-control-dark"
                    rows="3"
                    value={currentProduct.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="d-flex gap-2 justify-content-end mt-4">
                  {isEditing && (
                    <button type="button" className="btn btn-outline-accent" onClick={resetForm}>
                      Cancelar
                    </button>
                  )}
                  <button type="submit" className="btn btn-accent">
                    {isEditing ? "Guardar Cambios" : "Agregar Canasta"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-8">
            <div className="ui-panel p-4">
              <h3 className="mb-4 fw-bold">Inventario de Productos</h3>
              <div className="table-responsive">
                <table className="table-verde">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Categor\u00eda</th>
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
                              type="button"
                              className="btn btn-outline-accent btn-sm"
                              onClick={() => handleEdit(product)}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              className="btn btn-accent btn-sm admin-btn-delete"
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
    </div>
  );
};
