# Ecom API

A beginner-friendly E-commerce REST API built with Node.js, Express, and Sequelize (MySQL).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JWT + bcrypt
- **Validation:** Joi
- **Utilities:** CORS, Morgan (logging), Multer (file uploads), dotenv

## Features

- User authentication (register, login, JWT)
- User management (CRUD, status toggle)
- Category management (hierarchical categories with parent_id)
- Product management
- Inventory management
- Cart & Cart items
- Address management
- File uploads with Multer
- Request logging with Morgan

## Project Structure

```
ecom-api/
├── config/
│   └── database.js        # Sequelize MySQL connection
├── controllers/
│   ├── userController.js
│   ├── categoryController.js
│   ├── productController.js
│   ├── inventoryController.js
│   ├── addressController.js
│   └── cartController.js
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Product.js
│   ├── ProductImage.js
│   ├── Inventory.js
│   ├── Cart.js
│   ├── CartItem.js
│   └── Address.js
├── routes/
│   ├── userRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── inventoryRoutes.js
│   └── addressRoute.js
├── server.js              # App entry point
├── package.json
└── .env
```

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | User login |
| GET | `/api/users/profile/:id` | Get user profile |
| DELETE | `/api/users/:id` | Delete user |
| PATCH | `/api/users/:id/status` | Toggle user active status |
| POST | `/api/users/refresh-token` | Refresh JWT token |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category |
| GET | `/api/categories/:id` | Get category by ID |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get inventory |
| POST | `/api/inventory` | Add inventory |
| GET | `/api/inventory/:id` | Get inventory item |
| PUT | `/api/inventory/:id` | Update inventory |
| DELETE | `/api/inventory/:id` | Delete inventory |

## Getting Started

### Prerequisites
- Node.js v18+
- MySQL server

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
```

### Run

```bash
npm run dev    # Development with nodemon
npm start      # Production
```

## Database

The API auto-creates tables on startup using `sequelize.sync({ alter: true })`. The database `ecom_api` must be created manually in MySQL before running.

```sql
CREATE DATABASE ecom_api;
```
