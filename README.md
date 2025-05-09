# 🛍️ Comercio Frontend (Next.js)

Este es el frontend de la plataforma de gestión de comerciantes, desarrollado con **Next.js**. Permite registrar, editar, listar y exportar información de comerciantes registrados, conectándose con un backend en **NestJS**.

## 📦 Requisitos

- Node.js >= 18.x
- Docker y Docker Compose (opcional, para levantar en contenedor)
- Tener el backend corriendo antes de iniciar el frontend

> **⚠️ Importante:** Este frontend depende del backend que debe estar corriendo en `http://localhost:3001` o en la URL especificada por `BACKEND_API_URL`.

---

## 🚀 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/jorge7712051/commerce-platform.git
cd commerce-platform

# Instalar dependencias
npm install
```

---

## ⚙️ Variables de entorno

Configute el archivo `.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://backend:3001/api
BACKEND_API_URL=http://backend:3001/api
JWT_EXPIRES_IN=900
```

Asegúrate que el backend esté corriendo.

---

## 🐳 Ejecutar con Docker

1. Asegúrate de tener el backend corriendo (en contenedor o local).
2. Luego ejecuta:

```bash
docker-compose up -d
```

---
## 🧪 Endpoints

Una vez levantado, accedé a la aplicación:

📘 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Credenciales de acceso

```bash
Correo: admin@crm.com
Contraseña: admin123
```

---

## 🔧 Scripts disponibles

| Comando         | Descripción                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Ejecuta el servidor en modo desarrollo |
| `npm run build` | Compila la aplicación para producción  |
| `npm start`     | Inicia el servidor en producción       |
| `npm run lint`  | Ejecuta el linter                      |

---

## 📁 Estructura del proyecto

```
├── app/                    # Rutas y APIs locales
├── components/             # Componentes reutilizables
├── context/                # Contexto global (Auth)
├── interfaces/             # Tipos e interfaces TypeScript
├── lib/                    # Lógica para consumir APIs
├── public/                 # Archivos estáticos
└── styles/                 # Estilos globales
```

---

## 📌 Notas

- El token JWT se guarda como cookie segura y se usa para autenticar las solicitudes.
- Asegúrate de tener las rutas del backend funcionando como `/comerciantes`, `/auth/login`, etc.

---

## 👨‍⚕️ Autor

Desarrollado por Jorge leonardo Correa.

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.
