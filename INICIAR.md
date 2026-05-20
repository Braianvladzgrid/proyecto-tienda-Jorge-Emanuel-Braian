# Cómo probar La Verde en Windows

## Requisitos

- Node.js 18+
- Python 3.10+

## Paso 1 — Backend (terminal 1)

```powershell
cd c:\Users\Andre\proyecto-tienda-Jorge-Emanuel-Braian
python -m pip install -r requirements.txt
copy .env.example .env
python run_backend.py
```

Verás: `27 productos` y `Backend La Verde: http://127.0.0.1:3001`

**Cuenta admin:** `admin@laverde.com` / `admin1234`

**Cloudinary (opcional):** completá `CLOUDINARY_*` en `.env` para subir fotos en Admin.

## Paso 2 — Frontend (terminal 2)

```powershell
cd tienda-frontend
copy .env.example .env
npm install
npm start
```

http://localhost:3000

## Probar integración completa

1. Login como **admin** → menú **Admin** → crear/editar producto (subir imagen).
2. Registrate como cliente → agregar al carrito → favoritos → checkout → **Mis pedidos**.

## Documentación del proyecto

- `PROYECTO_LA_VERDE.md` — entrega y checklist consigna
- `USER_STORIES.md` — backlog para GitHub Project
