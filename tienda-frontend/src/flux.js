const API = "https://tienda-backend-3rop.onrender.com/api";
const getState = ({ getStore, getActions, setStore }) => ({
  store: { products: [], product: null, cart: [], favorites: [], token: localStorage.getItem("token") || null, user: null, loading: false, error: null, message: null },
  actions: {
    clearMessage: () => setStore({ message: null, error: null }),
    login: async (email, password) => {
      const resp = await fetch(`${API}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await resp.json();
      if (!resp.ok) { setStore({ error: data.msg || "Error al iniciar sesion" }); return false; }
      localStorage.setItem("token", data.token);
      setStore({ token: data.token, user: data.user || null });
      await getActions().getCart();
      await getActions().getFavorites();
      return true;
    },
    signup: async (name, email, password) => {
      const resp = await fetch(`${API}/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
      const data = await resp.json();
      if (!resp.ok) { setStore({ error: data.msg || "Error al registrarse" }); return false; }
      setStore({ message: "Cuenta creada. Por favor inicia sesion." });
      return true;
    },
    logout: () => { localStorage.removeItem("token"); setStore({ token: null, user: null, cart: [], favorites: [] }); },
    forgotPassword: async (email) => {
      const resp = await fetch(`${API}/forgot-password`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await resp.json();
      if (!resp.ok) { setStore({ error: data.msg || "Error al enviar el correo" }); return false; }
      setStore({ message: "Correo de recuperacion enviado. Revisa tu bandeja." });
      return true;
    },
    getProducts: async () => {
      setStore({ loading: true });
      try { const resp = await fetch(`${API}/products`); const data = await resp.json(); setStore({ products: Array.isArray(data) ? data : [], loading: false }); }
      catch { setStore({ products: [], loading: false }); }
    },
    getProduct: async (id) => {
      setStore({ loading: true, product: null });
      try { const resp = await fetch(`${API}/products/${id}`); const data = await resp.json(); setStore({ product: data, loading: false }); }
      catch { setStore({ loading: false }); }
    },
    getCart: async () => {
      const token = getStore().token; if (!token) return;
      try { const resp = await fetch(`${API}/cart`, { headers: { Authorization: `Bearer ${token}` } }); if (!resp.ok) return; const data = await resp.json(); setStore({ cart: Array.isArray(data) ? data : [] }); }
      catch { setStore({ cart: [] }); }
    },
    addToCart: async (productId, quantity = 1) => {
      const token = getStore().token; if (!token) return false;
      const resp = await fetch(`${API}/cart`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ product_id: productId, quantity }) });
      if (!resp.ok) return false; await getActions().getCart(); return true;
    },
    updateCartItem: async (itemId, quantity) => {
      const token = getStore().token;
      await fetch(`${API}/cart/${itemId}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ quantity }) });
      await getActions().getCart();
    },
    removeFromCart: async (itemId) => {
      const token = getStore().token;
      await fetch(`${API}/cart/${itemId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      await getActions().getCart();
    },
    getFavorites: async () => {
      const token = getStore().token; if (!token) return;
      try { const resp = await fetch(`${API}/favorites`, { headers: { Authorization: `Bearer ${token}` } }); if (!resp.ok) return; const data = await resp.json(); setStore({ favorites: Array.isArray(data) ? data : [] }); }
      catch { setStore({ favorites: [] }); }
    },
    toggleFavorite: async (productId) => {
      const token = getStore().token; if (!token) return;
      const isFav = getStore().favorites.some((f) => f.product_id === productId);
      if (isFav) { await fetch(`${API}/favorites/${productId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); }
      else { await fetch(`${API}/favorites`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ product_id: productId }) }); }
      await getActions().getFavorites();
    },
    getProfile: async () => {
      const token = getStore().token; if (!token) return;
      try { const resp = await fetch(`${API}/profile`, { headers: { Authorization: `Bearer ${token}` } }); if (!resp.ok) return; const data = await resp.json(); setStore({ user: data }); }
      catch { return; }
    },
  },
});
export default getState;
