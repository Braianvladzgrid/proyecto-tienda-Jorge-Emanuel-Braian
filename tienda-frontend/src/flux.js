const API = "http://127.0.0.1:3001/api";
const getState = ({ getStore, getActions, setStore }) => ({
  store: { 
    products: [], 
    product: null, 
    cart: [], 
    favorites: [], 
    token: localStorage.getItem("token") || null, 
    user: null,
    error: null,
    message: null 
  },
  actions: {
    clearMessage: () => setStore({ message: null, error: null }),
    login: async (email, password) => {
      const resp = await fetch(API + "/login", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email, password }) 
      });
      if (!resp.ok) return false;
      const data = await resp.json();
      localStorage.setItem("token", data.token);
      setStore({ token: data.token, user: data.user });
      return true;
    },
    getProducts: async () => {
      try {
        const resp = await fetch(API + "/products");
        const data = await resp.json();
        setStore({ products: data });
      } catch (error) {
        console.log("Error cargando productos", error);
      }
    }
  }
});
export default getState;
