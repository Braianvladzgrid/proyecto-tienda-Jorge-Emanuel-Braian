const API = "http://127.0.0.1:3001/api";

const prodSample = [
  {
    id: 3,
    name: "Manzana Roja",
    stock: 10,
    unit: "kg",
    category: "Frutas",
    description:
      "Manzana gala delicious, dulce y crujiente. Cosecha de temporada.",
    price: 60,
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZkWusYYJvr1c9Ijx2DyAAtfW9evxbguavUA&s",
  },
  {
    id: 2,
    name: "Lechuga Bola",
    stock: 24,
    unit: "pza",
    category: "Verduras",
    description: "Lechuga tipo iceberg, fresca y crocante.",
    price: 30,
    image_url:
      "https://www.grillhouse.mx/cdn/shop/files/romana_400x.jpg?v=1753147574",
  },
  {
    id: 1,
    name: "Huevo Rojo",
    stock: 50,
    unit: "docena",
    category: "Pecuarios",
    description: "Huevo blanco de gallina, fresco del día.",
    price: 55,
    image_url:
      "https://clickabasto.com/cdn/shop/products/huevo_62ca4251-c788-4b21-8b46-cc66300781f6_355x356.jpg?v=1654034598",
  },
  {
    id: 5,
    name: "Pechuga de Pollo",
    stock: 7,
    unit: "kg",
    category: "Pecuarios",
    description: "Pechuga de pollo entera, sin hueso.",
    price: 249,
    image_url:
      "https://clickabasto.com/cdn/shop/products/5e997e247257a_948x465.jpg?v=1655781934",
  },
  {
    id: 72,
    name: "Perejil",
    stock: 17,
    unit: "pza",
    category: "Hierbas",
    description: "Manojo de Perejil de 250g, fresco y aromático.",
    price: 40,
    image_url:
      "https://clickabasto.com/cdn/shop/files/perejil_360x360.webp?v=1735241032",
  },
  {
    id: 8,
    name: "Tomate Perita",
    stock: 30,
    unit: "kg",
    category: "Verduras",
    description: "Tomate perita maduro, ideal para salsas caseras.",
    price: 45,
    image_url:
      "https://clickabasto.com/cdn/shop/products/tomate_360x360.jpg?v=1654034598",
  },
  {
    id: 9,
    name: "Banana",
    stock: 40,
    unit: "kg",
    category: "Frutas",
    description: "Banana de primera calidad, madura y dulce.",
    price: 35,
    image_url:
      "https://clickabasto.com/cdn/shop/products/platano_360x360.jpg?v=1654034598",
  },
  {
    id: 10,
    name: "Albahaca",
    stock: 12,
    unit: "pza",
    category: "Hierbas",
    description: "Manojo de albahaca fresca, ideal para pastas y ensaladas.",
    price: 38,
    image_url:
      "https://clickabasto.com/cdn/shop/files/albahaca_360x360.webp?v=1735241032",
  },
];

const userSample = [
  {
    id: 1,
    firstName: "Emanuel",
    lastName: "García",
    email: "emanuel@gmail.com",
    password: "12345",
  },
  {
    id: 2,
    firstName: "Jorge",
    lastName: "López",
    email: "jorge@gmail.com",
    password: "12345",
  },
  {
    id: 3,
    firstName: "Braian",
    lastName: "Vlad",
    email: "braian@gmail.com",
    password: "12345",
  },
];

const getState = ({ getStore, getActions, setStore }) => ({
  store: {
    products: prodSample,
    product: {},
    cart: JSON.parse(localStorage.getItem("laverde_cart") || "[]"),
    favorites: JSON.parse(localStorage.getItem("laverde_favorites") || "[]"),
    users: JSON.parse(
      localStorage.getItem("laverde_users") || JSON.stringify(userSample),
    ),
    token: localStorage.getItem("laverde_token") || null,
    user: JSON.parse(localStorage.getItem("laverde_user") || "null"),
    error: null,
    message: null,
  },

  actions: {
    clearMessage: () => setStore({ message: null, error: null }),

    signup: (firstName, lastName, email, password) => {
      const store = getStore();
      const exists = store.users.find((u) => u.email === email);
      if (exists) {
        setStore({ error: "Ya existe una cuenta con ese email." });
        return false;
      }
      const newUser = { id: Date.now(), firstName, lastName, email, password };
      const updatedUsers = [...store.users, newUser];
      localStorage.setItem("laverde_users", JSON.stringify(updatedUsers));
      setStore({
        users: updatedUsers,
        error: null,
        message: "Cuenta creada con éxito. ¡Ya podés iniciar sesión!",
      });
      return true;
    },

    login: (email, password) => {
      const store = getStore();
      const userMatch = store.users.find(
        (u) => u.email === email && u.password === password,
      );
      if (!userMatch) {
        setStore({ error: "Email o contraseña incorrectos." });
        return false;
      }
      const token = "token-" + userMatch.id + "-" + Date.now();
      localStorage.setItem("laverde_token", token);
      localStorage.setItem("laverde_user", JSON.stringify(userMatch));
      setStore({ token, user: userMatch, error: null });
      return true;
    },

    logout: () => {
      localStorage.removeItem("laverde_token");
      localStorage.removeItem("laverde_user");
      localStorage.removeItem("laverde_cart");
      localStorage.removeItem("laverde_favorites");
      setStore({ token: null, user: null, cart: [], favorites: [] });
    },

    getProducts: async () => {
      try {
        const resp = await fetch(API + "/products");
        if (!resp.ok) throw new Error();
        const data = await resp.json();
        setStore({ products: data });
      } catch {
        setStore({ products: prodSample });
      }
    },

    getProduct: (id) => {
      const store = getStore();
      const productMatch = store.products.find((item) => item.id == id);
      setStore({ product: productMatch || {} });
    },

    addToCart: (product, quantity = 1) => {
      const store = getStore();
      const existing = store.cart.find((item) => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = store.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        updatedCart = store.cart;
        let newItem = product;
        newItem.quantity = quantity;
        updatedCart.push(newItem);
      }
      localStorage.setItem("laverde_cart", JSON.stringify(updatedCart));
      setStore({ cart: updatedCart });
    },

    removeFromCart: (productId) => {
      const store = getStore();
      const updatedCart = store.cart.filter((item) => item.id !== productId);
      localStorage.setItem("laverde_cart", JSON.stringify(updatedCart));
      setStore({ cart: updatedCart });
    },

    updateCartQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        getActions().removeFromCart(productId);
        return;
      }
      const store = getStore();
      const updatedCart = store.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
      localStorage.setItem("laverde_cart", JSON.stringify(updatedCart));
      setStore({ cart: updatedCart });
    },

    clearCart: () => {
      localStorage.removeItem("laverde_cart");
      setStore({ cart: [] });
    },

    toggleFavorite: (productId) => {
      const store = getStore();
      const isFav = store.favorites.some((f) => f.product_id === productId);
      const updatedFavs = isFav
        ? store.favorites.filter((f) => f.product_id !== productId)
        : [...store.favorites, { product_id: productId }];
      localStorage.setItem("laverde_favorites", JSON.stringify(updatedFavs));
      setStore({ favorites: updatedFavs });
    },

    forgotPassword: (email) => {
      const store = getStore();
      const userMatch = store.users.find((u) => u.email === email);
      if (!userMatch) {
        setStore({ error: "No encontramos una cuenta con ese email." });
        return false;
      }
      setStore({
        error: null,
        message: "Te enviamos un enlace de recuperación a " + email,
      });
      return true;
    },

    updateProfile: (fields) => {
      const store = getStore();
      const updatedUser = { ...store.user, ...fields };
      const updatedUsers = store.users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u,
      );
      localStorage.setItem("laverde_user", JSON.stringify(updatedUser));
      localStorage.setItem("laverde_users", JSON.stringify(updatedUsers));
      setStore({
        user: updatedUser,
        users: updatedUsers,
        message: "Perfil actualizado con éxito.",
      });
    },
  },
});

export default getState;
