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
      "https://clickabasto.com/cdn/shop/products/Jitomate-saladet_695x695.jpg?v=1655778735",
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
      "https://clickabasto.com/cdn/shop/products/download_1_221f856c-ddb8-4301-86b9-cefa5a13d4bf_225x225.jpg?v=1655781816",
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
      "https://clickabasto.com/cdn/shop/products/albahaca-500x345_500x345.jpg?v=1655680779",
  },
  {
    id: 15,
    name: "Oregano",
    stock: 38,
    unit: "pza",
    category: "Condimentos",
    description:
      "Condimento ideal para elaborar salsa pomodoro, aderezos, vinagretas o aromatizar diversos platillos",
    price: 38,
    image_url:
      "https://clickabasto.com/cdn/shop/products/oregano_1_3bd647cc-7e66-48ed-a553-94b8d20c19e9_695x695.jpg?v=1654034474",
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
    products: JSON.parse(
      localStorage.getItem("laverde_products") || JSON.stringify(prodSample),
    ),
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
      if (
        !firstName?.trim() ||
        !lastName?.trim() ||
        !email?.trim() ||
        !password?.trim()
      ) {
        setStore({ error: "Todos los campos son obligatorios." });
        return false;
      }
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
        localStorage.setItem("laverde_products", JSON.stringify(data));
        setStore({ products: data });
      } catch {
        const saved = JSON.parse(
          localStorage.getItem("laverde_products") ||
            JSON.stringify(prodSample),
        );
        setStore({ products: saved });
      }
    },

    getProduct: (id) => {
      const store = getStore();
      const productMatch = store.products.find(
        (item) => Number(item.id) === Number(id),
      );
      setStore({ product: productMatch || {} });
    },

    createProduct: (data) => {
      const store = getStore();
      const newProduct = {
        ...data,
        id: Date.now(),
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
      };
      const updated = [...store.products, newProduct];
      localStorage.setItem("laverde_products", JSON.stringify(updated));
      setStore({ products: updated });
    },

    updateProduct: (id, data) => {
      const store = getStore();
      const updated = store.products.map((p) =>
        Number(p.id) === Number(id)
          ? {
              ...p,
              ...data,
              price: data.price !== undefined ? Number(data.price) : p.price,
              stock: data.stock !== undefined ? Number(data.stock) : p.stock,
            }
          : p,
      );
      localStorage.setItem("laverde_products", JSON.stringify(updated));
      setStore({ products: updated });
    },

    deleteProduct: (id) => {
      const store = getStore();
      const updated = store.products.filter((p) => Number(p.id) !== Number(id));
      localStorage.setItem("laverde_products", JSON.stringify(updated));
      setStore({ products: updated });
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
        updatedCart = [...store.cart, { ...product, quantity }];
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
        item.id === productId ? { ...item, quantity: Number(quantity) } : item,
      );
      localStorage.setItem("laverde_cart", JSON.stringify(updatedCart));
      setStore({ cart: updatedCart });
    },

    clearCart: () => {
      localStorage.removeItem("laverde_cart");
      setStore({ cart: [] });
    },

    checkoutOrder: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.removeItem("laverde_cart");
      setStore({ cart: [] });
      return true;
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
