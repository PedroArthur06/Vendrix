# Vendrix | High-Performance E-commerce Architecture

![License](https://img.shields.io/github/license/pedroarthur06/vendrix?style=for-the-badge&color=blue)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> **Full-Stack E-commerce Application engineered for scalability, maintainability, and clean code principles.**

---

## 🧠 Engineering & Architecture

Vendrix is not just a shopping cart; it is a study in **Software Engineering applied to Web Development**. The project was built to solve common scalability and maintenance problems found in monolithic applications.

### Key Architectural Decisions:
* **Clean Architecture (Modular Monolith):** The system is decoupled into isolated modules (`User`, `Product`, `Order`), ensuring that business rules are independent of frameworks or databases.
* **SOLID Principles:** Heavy usage of Dependency Inversion and Single Responsibility principles to ensure testability.
* **Domain-Driven Design (DDD) Concepts:** Implementation of DTOs, Domain Models, and clear separation between Domain Logic and Infrastructure concerns.

---

## 🚀 Tech Stack

### Backend API
* **Core:** Node.js, TypeScript, Express.
* **Database:** PostgreSQL (via Docker), Prisma ORM.
* **Validation:** Zod (Schema Validation).
* **Security:** JWT Authentication, BCrypt hashing.
* **Containerization:** Docker & Docker Compose.

### Frontend (Web)
* **Framework:** React (Vite).
* **Styling:** TailwindCSS, Shadcn/ui.
* **State Management:** Zustand (Global Store).
* **Integration:** Axios.

---

## 🛠️ Project Structure

The codebase is organized to reflect the architectural boundaries:

```bash
src/
├── modules/                  # Business Domains
│   ├── users/                # User Context (Auth, Profile)
│   ├── products/             # Catalog Context
│   └── orders/               # Checkout & Sales Context
├── shared/
│   ├── infra/                # Http Server, Database connection
│   ├── errors/               # Global Error Handling
│   └── providers/            # External services (Mail, Storage)
└── web/                      # React Frontend Application
