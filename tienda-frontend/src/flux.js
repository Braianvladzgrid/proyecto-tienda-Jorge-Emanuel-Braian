import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

const API = "http://127.0.0.1:3001/api";

// ************
const prodSample = [
  {
    id: 3,
    name: "manzana roja",
    stock: 10,
    unit: "kg",
    category: "Frutas",
    description: "manzana gala delicious",
    price: 60,
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZkWusYYJvr1c9Ijx2DyAAtfW9evxbguavUA&s",
  },
  {
    id: 2,
    name: "lechuga bola",
    stock: 24,
    unit: "pza",
    category: "Verduras",
    description: "lechuga tipo iceberg",
    price: 30,
    image_url:
      "https://www.grillhouse.mx/cdn/shop/files/romana_400x.jpg?v=1753147574",
  },
  {
    id: 1,
    name: "huevo rojo",
    stock: 50,
    unit: "kg",
    category: "Pecuarios",
    description: "Huevo blanco de gallina",
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
    description: "Pechuga de pollo entera",
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
    description: "Manojo de Perejil de 250g",
    price: 40,
    image_url:
      "https://clickabasto.com/cdn/shop/files/perejil_360x360.webp?v=1735241032",
  },
];

const userSample = [
  {
    id: 1,
    firstName: "Emanuel",
    email: "emanuel@gmail.com",
    password: "12345",
  },
  {
    id: 2,
    firstName: "Jorge",
    email: "jorge@gmail.com",
    password: "12345",
  },
  {
    id: 3,
    firstName: "Braian",
    email: "braian@gmail.com",
    password: "12345",
  },
];

const cartSample = [
  {
    id: 1,
    firstName: "Emanuel",
    email: "emanuel@gmail.com",
    password: "12345",
  },
  {
    id: 2,
    firstName: "Jorge",
    email: "jorge@gmail.com",
    password: "12345",
  },
  {
    id: 3,
    firstName: "Braian",
    email: "braian@gmail.com",
    password: "12345",
  },
];

// *****************************

const getState = ({ getStore, getActions, setStore }) => ({
  store: {
    products: prodSample,
    product: {},
    cart: [],
    favorites: [],
    token: localStorage.getItem("token") || null,
    user: null,
    error: null,
    message: null,
  },
  actions: {
    clearMessage: () => setStore({ message: null, error: null }),

    login: async (email, password) => {
      try {
        const userMatch = userSample.find((user) => user.email == email);
        setStore({ token: "OK", user: userMatch });
      } catch (error) {
        console.log("Error cargando usuario", error);
      }
    },

    // login: async (email, password) => {
    //   const resp = await fetch(API + "/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (!resp.ok) return false;
    //   const data = await resp.json();
    //   localStorage.setItem("token", data.token);
    //   setStore({ token: data.token, user: data.user });
    //   return true;
    // },

    logout: async (email, password) => {
      try {
        setStore({ token: null, user: null });
      } catch (error) {
        console.log("Error al salir", error);
      }
    },

    getProducts: async () => {
      try {
        const resp = await fetch(API + "/products");
        const data = await resp.json();
        setStore({ products: data });
      } catch (error) {
        console.log("Error cargando productos", error);
      }
    },
    getProduct: async (id) => {
      try {
        const productMatch = prodSample.find((item) => item.id == id);
        setStore({ product: productMatch });
      } catch (error) {
        console.log("Error cargando producto", error);
      }
    },
  },
});
export default getState;
