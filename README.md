# GhostDrop

> **Receive anonymous messages and feedback from your friends, colleagues, and the world.**

**Live Demo:** [https://ghostdrop-alpha.vercel.app/](https://ghostdrop-alpha.vercel.app/)

---

## About The Project

GhostDrop is a full-stack anonymous messaging application built with a modern technology stack. It provides a secure and engaging platform for users to receive feedback and messages without the sender needing to reveal their identity. Each user gets a unique, shareable link that they can post on social media or send to friends. Anyone with the link can drop a message, which the user can then view and manage on their private, protected dashboard.

This project was built to demonstrate a comprehensive understanding of full-stack web development, including user authentication, database management, API design, and modern frontend development with Next.js and React.

### Key Features

- **User Authentication:** Secure user registration with email verification and password hashing.
- **Protected Dashboard:** A private, authenticated dashboard for users to view their received messages.
- **Unique Shareable Links:** Each user gets a unique public URL (e.g., `ghostdrop.com/u/username`) to share.
- **Anonymous Messaging:** Anyone with the link can send a message without needing an account.
- **Message Management:** Users can view all their messages, sorted by the most recent.
- **Secure Sessions:** Uses JWTs (JSON Web Tokens) stored in `HttpOnly` cookies for secure session management.

---

## Tech Stack

This project is built with a modern, scalable, and secure technology stack:

- **Framework:** [Next.js](https://nextjs.org/)
- **Frontend:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** Next.js API Routes
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** `jose` for JWTs, `bcryptjs` for password hashing
- **Email Service:** [Brevo](https://www.brevo.com/) for transactional emails
- **Deployment:** [Vercel](https://vercel.com/)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm
- A free MongoDB Atlas account
- A free Brevo account

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/Arun-s21/ghostdrop.git](https://github.com/Arun-s21/ghostdrop.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd ghostdrop
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    - Create a file named `.env` in the root of the project.
    - Add the following variables, replacing the placeholder values with your own keys:
      ```env
      DATABASE_URL=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_jwt_key
      BREVO_API_KEY=your_brevo_api_key
      ```
5.  **Run the development server**
    ```sh
    npm run dev
    ```
    The application should now be running at `http://localhost:3000`.

---

## Contact

Arun Singh - arunsng18@gmail.com

Project Link: [https://github.com/Arun-s21/ghostdrop](https://github.com/Arun-s21/ghostdrop)
