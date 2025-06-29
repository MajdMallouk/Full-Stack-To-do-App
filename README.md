# Up2Media Todo App

A simple full‑stack Todo application built with **Laravel** (API backend) and **React + Vite** (SPA frontend).  
Authentication uses **Laravel Sanctum** issuing Bearer tokens, and all Todo CRUD operations are exposed as JSON API endpoints consumed by the React app.

---

## Features

- **User Authentication** via Laravel Sanctum (token‑based)
- **Register**, **Login**, **Logout** endpoints
- **Todo CRUD** (Create, Read, Update, Delete)
- Front‑end written in **React + TypeScript + Vite**
- **Axios** for HTTP requests with Bearer token interceptor
- **Route guards** (`PublicRoute`, `PrivateRoute`) to protect pages
- **Server‑side** validation via Laravel FormRequests
- **Client‑side** validation and UX enhancements
- **Tailwind CSS** for utility‑first styling

---

## Prerequisites

- **PHP** ≥ 8.0
- **Composer**
- **MySQL** (or other supported database)
- **Node.js** ≥ 16.x and **npm** (or Yarn)
- **Git**

---

## Installation

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/MajdMallouk/Full-Stack-To-do-App.git
cd up2media-todo

# Install PHP dependencies
composer install

# Copy and configure .env
cp .env.example .env
php artisan key:generate

# Run teh migrations
php artisan migrate

# Start the server
php artisan serve
```
The API runs at http://127.0.0.1:8000.

---

### Backend Setup

```bash
# Navigate to frontend folder
cd up2media-todo

# Install Node.js dependencies
npm install

# Start Vite dev server
npm run dev
```
The SPA runs at http://localhost:5173.


---

### Project Structure

```bash
 backend/                     # Laravel API
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── TodoController.php
│   ├── Models/
│   │   ├── User.php
│   │   └── Todo.php
│   └── Requests/            # FormRequest validation
│       ├── LoginRequest.php
│       ├── RegisterRequest.php
│       ├── TodoStoreRequest.php
│       └── TodoUpdateRequest.php
├── config/
│   └── sanctum.php
├── database/
│   ├── migrations/
│   └── seeders/
└── routes/
    ├── api.php
    └── web.php
    
    

frontend/                    # React + Vite SPA
├── src/
│   ├── api.ts               # Axios instance with interceptor
│   ├── App.tsx              # Router & guards
│   ├── main.tsx             # Entry point
│   └── components/
│       ├── auth/
│       │   ├── Login.tsx
│       │   └── Register.tsx
│       ├── routes/
│       │   ├── PrivateRoute.tsx
│       │   └── PublicRoute.tsx
│       └── todos/
│           └── Todos.tsx
├── index.html
└── tailwind.config.js

 ```
---

### API Endpoints
| Method | Endpoint          | Auth           | Description            |
| ------ | ----------------- | -------------- | ---------------------- |
| POST   | `/api/register`   | Public         | Register & issue token |
| POST   | `/api/login`      | Public         | Login & issue token    |
| POST   | `/api/logout`     | `auth:sanctum` | Revoke token           |
| GET    | `/api/todos`      | `auth:sanctum` | List todos             |
| POST   | `/api/todos`      | `auth:sanctum` | Create new todo        |
| PUT    | `/api/todos/{id}` | `auth:sanctum` | Update todo            |
| DELETE | `/api/todos/{id}` | `auth:sanctum` | Delete todo            |

### Frontend Routes
| Path        | Component                        | Guard        |
| ----------- | -------------------------------- | ------------ |
| `/register` | Register.tsx                     | PublicRoute  |
| `/login`    | Login.tsx                        | PublicRoute  |
| `/todos`    | Todos.tsx                        | PrivateRoute |
| `*`         | Redirect based on token presence |              |

- ( z z z الجداول هون قصتن قصة)
---
### Troubleshooting

- **422 response:** Check FormRequest rules and front‑end input length.
- **CORS errors:** Verify config/cors.php and SANCTUM_STATEFUL_DOMAINS.
- **401 Unauthorized:** Ensure token is in localStorage and Axios interceptor is set.

### Testing

You can run the basic  backend Pest test to check if the endpoints are functioning as expected using:

```bash
php artisan test
```

---

### 📫 Get in Touch
- Email: [majdmallouk365@gmail.com](mailto:majdmallouk365@gmail.com)

### Majd Mallouk.
