# Experiment 10 — CRUD Operations using Node.js + Express.js + MongoDB

## Objective
Build REST APIs using Node.js and Express.js, connect with MongoDB, and perform Create, Read, Update, Delete (CRUD) operations. APIs are tested using Postman.

---

## Tech Stack
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework for building REST APIs
- **MongoDB** — NoSQL database for storing records
- **Mongoose** — ODM library to interact with MongoDB
- **Postman** — API testing tool

---

## Project Structure
```
experiment10/
├── server.js               # Entry point — Express app + DB connection
├── models/
│   └── Student.js          # Mongoose schema and model
├── routes/
│   └── studentRoutes.js    # All CRUD route handlers
├── package.json
└── README.md
```

---

## Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Make sure MongoDB is running locally
mongod

# 3. Start the development server
npm run dev
```

Server runs on: `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | /api/students        | Create a new student     |
| GET    | /api/students        | Get all students         |
| GET    | /api/students/:id    | Get student by ID        |
| PUT    | /api/students/:id    | Update student by ID     |
| DELETE | /api/students/:id    | Delete student by ID     |

---

## Sample Request (POST)

**URL:** `POST http://localhost:5000/api/students`

**Body (JSON):**
```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "course": "BCA"
}
```

**Response:**
```json
{
  "_id": "64abc123...",
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "course": "BCA",
  "__v": 0
}
```

---

## How It Works

1. **Node.js and Express.js** are used as the backend to handle HTTP requests.
2. **MongoDB** stores all student records as documents in the `collegeDB` database.
3. **Mongoose** provides schema validation and easy querying.
4. **CRUD operations** are implemented as separate route handlers with proper error handling.
5. **Postman** is used to test all endpoints by sending HTTP requests with JSON bodies.

---

## Student Schema Fields

| Field  | Type   | Description        |
|--------|--------|--------------------|
| name   | String | Full name          |
| email  | String | Email address      |
| course | String | Enrolled course    |
