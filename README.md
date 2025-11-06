# 📝 Full-Stack Todo List Application

A modern, feature-rich todo list application built with a powerful tech stack including Node.js, React, TypeScript, PostgreSQL, and Tailwind CSS.

![Todo App](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos by status (All, Active, Completed)
- ✅ Real-time task counter
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ Full TypeScript type safety
- ✅ RESTful API architecture
- ✅ PostgreSQL database for data persistence
- ✅ Connection pooling for scalability

## 🛠️ Tech Stack

### Client
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Server
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Relational database
- **pg (node-postgres)** - PostgreSQL client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v13 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fullstack-todo-app.git
cd fullstack-todo-app
```

### 2. Database Setup

**Option A: Using pgAdmin (Recommended for Windows)**

1. Open pgAdmin 4
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name it `todoapp`
5. Click "Save"

**Option B: Using Command Line**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todoapp;

# Exit
\q
```

### 3. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `server/.env` with your PostgreSQL credentials:**

```env
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=todoapp
DB_PASSWORD=your_password_here
DB_PORT=5432
```

**Start the server:**

```bash
npm run dev
```

You should see:
```
Database initialized successfully
Server running on http://localhost:3000
```

### 4. Client Setup

Open a new terminal:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

## 📁 Project Structure

```
fullstack-todo-app/
├── server/
│   ├── src/
│   │   ├── index.ts          # Express server setup
│   │   ├── db.ts             # Database connection & initialization
│   │   └── routes/
│   │       └── todos.ts      # Todo API routes
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── client/
│   ├── src/
│   │   ├── App.tsx           # Main Todo component
│   │   ├── main.tsx          # React entry point
│   │   └── index.css         # Tailwind CSS imports
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/todos` | Get all todos | - |
| POST | `/todos` | Create a new todo | `{ "title": "string" }` |
| PATCH | `/todos/:id` | Update a todo | `{ "completed": boolean, "title": "string" }` |
| DELETE | `/todos/:id` | Delete a todo | - |
| GET | `/health` | Health check | - |

### Example Requests

**Create a Todo:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn TypeScript"}'
```

**Get All Todos:**
```bash
curl http://localhost:3000/api/todos
```

**Update a Todo:**
```bash
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a Todo:**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## 🗄️ Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 UI Features

- **Gradient Background** - Modern blue-to-indigo gradient
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects and transitions
- **Filter Tabs** - All, Active, Completed views
- **Visual Feedback** - Loading states and empty states
- **Keyboard Support** - Press Enter to add todos
- **Delete on Hover** - Delete button appears on hover

## 🔧 Development

### Server Development

```bash
cd server

# Development mode with auto-reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Client Development

```bash
cd client

# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing the API

You can test the API using:

1. **Browser** - Visit `http://localhost:3000/health`
2. **Postman** - Import the API endpoints
3. **curl** - Use the example requests above
4. **Thunder Client** (VS Code extension)

## 🐛 Troubleshooting

### Server Issues

**Problem: "Database connection failed"**
```bash
# Solution: Check PostgreSQL is running
# Windows:
services.msc → PostgreSQL → Start

# macOS:
brew services start postgresql

# Linux:
sudo systemctl start postgresql
```

**Problem: "Port 3000 already in use"**
```bash
# Solution: Change port in server/.env
PORT=3001
```

### Client Issues

**Problem: "Cannot connect to API"**
- Make sure server is running on `http://localhost:3000`
- Check CORS is enabled in server
- Verify `API_URL` in `App.tsx`

**Problem: "Module not found"**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem: Tailwind styles not working**
```bash
# Solution: Rebuild Tailwind
npm run dev
```

## 📈 Performance & Scalability

This application is built with scalability in mind:

- **Connection Pooling** - Efficient database connection management
- **Prepared Statements** - SQL injection prevention and performance
- **Indexed Queries** - Fast database lookups
- **RESTful Architecture** - Easy to scale horizontally
- **TypeScript** - Catch errors before runtime

### Recommended Optimizations for Production:

1. Add Redis caching layer
2. Implement database indexes
3. Set up read replicas
4. Add rate limiting
5. Enable gzip compression
6. Use CDN for client assets
7. Implement pagination for large datasets