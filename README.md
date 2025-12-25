### Colaboradores

<table>
  <tr>
    <td align="center"><a style="color: black" href="https://github.com/AxelLeo129"><img src="https://github.com/AxelLeo129.png" width="100" height="100" alt="Axel Leonardo"><br>Axel Leonardo</a></td>
  </tr>
</table>

---

### Tecnologías utilizadas

##### Backend
- Node.js **22.20.0**
- Express
- Dotenv
- Swagger (OpenAPI 3) con swagger-jsdoc + swagger-ui-express
- Tests: Vitest + Supertest

##### Frontend
- React
- Vite
- TailwindCSS

---

### Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js **22.20.0** (recomendado)
- npm (incluido con Node)

---

### Estructura sugerida del proyecto

```bash
root/
  backend/
  frontend/
```

---

### Variables de entorno

##### Backend (```backend/.env```)
Crea un archivo ```.env``` dentro de ```backend/```:
```bash
PORT=3000
EXTERNAL_POSTS_URL=https://687eade4efe65e5200875629.mockapi.io/api/v1/posts
```

##### Frontend (```frontend/.env```)
```bash
VITE_API_BASE_URL=http://localhost:3000
```

---

### Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. Clonar repositorio
    ```bash
    git clone https://github.com/AxelLeo129/offymarket-prueba-tecnica
    cd offymarket-prueba-tecnica
    ```

2. Instalar dependencias (Backend)
    ```bash
    cd backend
    npm install
    ```
3) Instalar dependencias (Frontend)
    ```bash
    cd ../frontend
    npm install
    ```

---

### Levantar el proyecto en desarrollo
##### A) Levantar Backend
En una terminal:
```bash
cd backend
npm run dev
```
El proyecto estará disponible en:
- http://localhost:3000

##### B) Ver documentación Swagger (Backend)
Una vez corriendo el backend:

- http://localhost:3000/api-docs


##### C) Levantar Frontend
En otra terminal:
```bash
cd frontend
npm run dev
```

El frontend quedará en:
👉 http://localhost:5173

---

### Ejecutar Tests
Backend (Vitest)
```bash
cd backend
npm test
```

---

### Endpoints
##### GET /posts

Devuelve posts agrupados por nombre, con conteo.

Query params

name (opcional): filtra por nombre (contiene)

Ejemplos:

- GET http://localhost:3000/posts

- GET http://localhost:3000/posts?name=ana

---

MIT
Free Software, software to learn!

---