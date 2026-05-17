# Store Rating Platform

A full-stack web application built for the Roxiler Systems assignment. Users can rate registered stores, with role-based access for Admins, Normal Users, and Store Owners.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, React Router v6, Axios |
| Backend | NestJS (Node.js) |
| Database | PostgreSQL + TypeORM |
| Auth | JWT (JSON Web Tokens) + Passport.js |
| Password | bcrypt |

---

## Features by Role

### System Administrator
- Dashboard with total users, stores, and ratings count
- Add normal users, admins, and store owners
- View + filter all users (by Name, Email, Address, Role)
- View + search all stores with their average ratings
- View individual user details (Store Owners show their store's avg rating)
- Sortable tables (ascending/descending)

### Normal User
- Register & login
- Browse all stores with search by Name/Address
- See overall store rating and their own submitted rating
- Submit a rating (1–5 stars) per store
- Modify an existing rating
- Update password

### Store Owner
- Login
- Dashboard showing all users who rated their store
- Average rating of their store
- Update password

---

## Form Validations
- **Name**: 20–60 characters
- **Address**: Max 400 characters
- **Password**: 8–16 chars, must include uppercase + special character
- **Email**: Standard email format
- **Rating**: Integer between 1 and 5

---

## Project Structure

```
store-rating-platform/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── auth/             # JWT auth, guards, strategies
│   │   ├── users/            # User CRUD + admin dashboard
│   │   ├── stores/           # Store management + owner dashboard
│   │   ├── ratings/          # Submit & update ratings
│   │   └── app.module.ts
│   └── .env
└── frontend/                 # React SPA
    └── src/
        ├── api/              # Axios instance
        ├── context/          # Auth context
        ├── components/       # Navbar, StarRating, SortableTable, ProtectedRoute
        └── pages/
            ├── admin/        # Dashboard, Users, Stores
            ├── user/         # Stores, UpdatePassword
            └── owner/        # Dashboard, UpdatePassword
```

---

## Setup & Installation

### Prerequisites
- Node.js >= 18
- PostgreSQL running locally

### 1. Database Setup
```sql
CREATE DATABASE store_rating_db;
```

### 2. Backend Setup
```bash
cd backend
npm install
# Edit .env with your DB credentials
cp .env.example .env
npm run start:dev
```

Backend runs on: `http://localhost:3000/api`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3001`

> Note: Set `PORT=3001` before starting if needed: `PORT=3001 npm start`

---

## Default Admin Account

Since admins can only be created by other admins, create the first admin directly in the DB:

```sql
-- After running the backend once (tables auto-created), insert admin:
INSERT INTO users (name, email, password, address, role)
VALUES (
  'System Administrator Account',
  'admin@ratestore.com',
  '$2b$10$YourBcryptHashHere',  -- use the seed script below
  '123 Admin Street, Pune, Maharashtra',
  'admin'
);
```

Or use the seed script:
```bash
cd backend
node seed-admin.js
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| PUT | /api/auth/update-password | Any authenticated user |

### Users (Admin only)
| Method | Endpoint |
|---|---|
| GET | /api/users |
| POST | /api/users |
| GET | /api/users/dashboard |
| GET | /api/users/:id |

### Stores
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/stores | Authenticated |
| POST | /api/stores | Admin only |
| GET | /api/stores/owner-dashboard | Store Owner only |

### Ratings
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/ratings | Normal User |
| PUT | /api/ratings/:id | Normal User |

---

## Database Schema

```
users
  id, name, email, password, address, role, createdAt

stores
  id, name, email, address, ownerId (FK → users), createdAt

ratings
  id, value (1-5), userId (FK → users), storeId (FK → stores), createdAt, updatedAt
  UNIQUE(userId, storeId)
```
