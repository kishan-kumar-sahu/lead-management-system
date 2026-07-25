# Lead Management System

A full-stack Lead Management System built using the MERN stack. The application allows users to submit leads through a public form, while administrators can securely log in to manage, search, and update lead statuses.

---

## Live Demo

https://lead-management-system-1-6ekb.onrender.com

## GitHub Repository

https://github.com/kishan-kumar-sahu/lead-management-system

---

# Features

### Public Lead Form
- Submit lead information
- Client-side validation
- Server-side validation
- Stores data in MongoDB

### Admin Dashboard
- Secure Admin Login
- View all leads
- Search leads
- Update lead status
- Responsive dashboard

### Authentication
- JWT Authentication
- Protected Routes
- Unauthorized users cannot access the admin dashboard

---

# Tech Stack

## Frontend
- React.js
- React Router
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JWT (JSON Web Token)

---

# Project Structure

```
lead-management-system/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# Data Model

## Lead Schema

| Field | Type |
|--------|------|
| name | String |
| email | String |
| budget | String |
| message | String |
| status | New / Contacted / Closed |
| createdAt | Date |

---

# Authentication Approach

The admin dashboard is protected using JWT Authentication.

Workflow:

1. Admin enters login credentials.
2. Server validates credentials.
3. JWT token is generated.
4. Token is stored on the client.
5. Protected APIs verify the token.
6. Authorized users can access the dashboard.

---

# API Endpoints

## Authentication

POST `/api/auth/login`

## Leads

POST `/api/leads`

GET `/api/leads`

PUT `/api/leads/:id`

DELETE `/api/leads/:id` *(if implemented)*

---

# Design Decisions

### 1. MongoDB

MongoDB was selected because it integrates well with Node.js and provides flexible document storage for lead information.

### 2. JWT Authentication

JWT was used to secure the admin dashboard and protect private API routes.

### 3. Validation

Implemented both client-side and server-side validation to improve security and data integrity.

---

# Error Handling

The application handles:

- Invalid form data
- Unauthorized access
- Database errors
- Network failures
- Invalid API requests

---

# Installation

## Clone Repository

```bash
git clone https://github.com/kishan-kumar-sahu/lead-management-system.git
```

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd api
npm install
```

---

# Environment Variables

Create a `.env` file.

```
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

PORT=5000
```

---

# Run Project

Backend

```bash
 node server.js
```

Frontend

```bash
npm run dev
```

---

# Future Improvements

- Pagination
- Email Notifications
- Lead Analytics Dashboard
- Export Leads to CSV
- Role-Based Authentication
- Dark Mode

---

# AI Usage Note

I used ChatGPT to understand the project requirements, review code, improve validation, debug issues, and refine the overall application structure. After using AI suggestions, I customized the implementation, improved error handling, enhanced the UI, tested the complete workflow, and made the final implementation my own.

---

# Author

**Kishan Kumar Sahu**

GitHub:
https://github.com/kishan-kumar-sahu

---

## Built for Digital Heroes Training Task

This project was built as part of the Digital Heroes Full Stack Development Internship Qualification Task.
