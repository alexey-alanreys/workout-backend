# Workout Server

Backend for the **Workout** educational project.

This project provides a RESTful API for managing workout routines, user authentication, and related fitness data.  
It is built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma**.

---

## ⚙️ Development

This project uses **Yarn** and requires **Node.js v22+**.

To run the development server:

```bash
yarn install
```

Create a PostgreSQL database named `workout`.

Create a `.env` file based on `.env.example`:

```
NODE_ENV=development
DATABASE_URL=postgresql://<USERNAME>:<PASSWORD>@localhost:5432/workout?schema=public
JWT_SECRET=<YOUR_SECRET_KEY>
```

Then apply existing migrations:

```bash
npx prisma migrate deploy
```

Finally, start the server:

```bash
yarn dev
```

---

**License:** MIT  
**Author:** [Albert Alanreys](https://github.com/albert-alanreys)
