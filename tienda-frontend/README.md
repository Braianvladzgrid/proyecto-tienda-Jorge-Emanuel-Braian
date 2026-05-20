# La Verde — Frontend

Tienda e-commerce de frutas y verduras. React + API Flask.

## Requisitos

- Node 18+
- Backend Flask corriendo en `http://127.0.0.1:3001`

## Configuración

```bash
cd tienda-frontend
cp .env.example .env
npm install
```

En `.env`:

```
REACT_APP_BACKEND_URL=http://127.0.0.1:3001
```

## Desarrollo

```bash
# Terminal 1 — backend (desde la raíz del repo)
pipenv install
pipenv run init-db
pipenv run insert-test-data
pipenv run start

# Terminal 2 — frontend
npm start
```

## Flujos conectados al API

- Registro y login (JWT, contraseña hasheada en servidor)
- Recuperar contraseña (`POST /api/forgot-password`)
- Carrito y favoritos por usuario
- Checkout real (`POST /api/orders`)
- Perfil (`GET/PUT /api/me`)
- Admin CRUD productos (requiere sesión iniciada)
- Mis pedidos (`/orders`)

## Build

```bash
npm run build
```

## Deploy

Desplegar el build en Render/Vercel/Netlify y configurar `REACT_APP_BACKEND_URL` con la URL pública del backend.
