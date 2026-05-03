# NGO Connect Web Application

A full-stack MERN web application designed to connect donors with verified NGOs across India. The platform enables users to discover organizations, explore campaigns, donate securely (simulated), and track their contributions through a personalized dashboard.

---

## Live Demo

- Frontend (Vercel): https://ngo-connect-webapp.vercel.app  
- Backend API (Render): https://ngo-connect-webapp.onrender.com  

---

## Overview

NGO Connect bridges the gap between donors and non-governmental organizations through a modern, scalable, and user-friendly platform. The application is built using a modular MERN architecture with a strong focus on performance, maintainability, and clean UI/UX.

---

## Architecture

This project follows a standard MERN stack architecture:

- Frontend: React (Vite) handles UI and client-side routing  
- Backend: Node.js and Express provide RESTful APIs  
- Database: MongoDB (via Mongoose) stores application data  
- Authentication: JWT-based authentication using Bearer tokens  

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JSON Web Tokens (JWT)

---

## Technologies Used

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,tailwind,js,html,css,git,github,vscode" />
</p>

---

## Features

- JWT-based authentication (login and registration)
- Persistent user sessions using token storage
- Discover NGOs with search and filtering (cause, location)
- Detailed NGO profiles with campaign listings
- Campaign-based and general donation flow
- Simulated multi-method payments (Card, UPI, Netbanking, Wallet)
- Donor dashboard with donation history and analytics
- Protected routes with authentication checks
- Modular backend architecture (MVC pattern)
- Responsive UI with modern design system
- RESTful API integration

---

## Project Structure

```NGO-Connect-WebApp/

├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── context/  
│   │   ├── assets/  
│   │   ├── App.jsx  
│   │   ├── main.jsx  
│   │   └── index.css  
│   └── package.json  
│  
├── backend/  
│   ├── models/  
│   ├── routes/  
│   ├── controllers/  
│   ├── middleware/  
│   ├── server.js  
│   ├── seed.js  
│   └── package.json  
│  
└── README.md
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/ngos | Fetch all NGOs |
| GET | /api/ngos/:id | Fetch NGO details |
| POST | /api/donate | Create donation (protected) |
| GET | /api/users/me | Get user profile |
| PUT | /api/users/me | Update user profile |
| PUT | /api/users/password | Change password |
| GET | /api/users/donations | Get donation history |

---

## Environment Variables

Create a .env file inside the backend/ directory:

``` .env
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
PORT=5000
```

---

## Installation

Clone Repository:

git clone https://github.com/your-username/ngo-connect-webapp.git  
cd ngo-connect-webapp  

Backend Setup:

``` bash
cd backend  
npm install  
npm run dev
```

Frontend Setup:

``` bash
cd frontend  
npm install  
npm run dev
```

---

## Deployment

- Frontend deployed on Vercel  
- Backend deployed on Render  
- Database hosted on MongoDB Atlas  

API Base URL used in frontend:

https://ngo-connect-webapp.onrender.com  

---

## Current Status

- Core features fully implemented  
- Frontend and backend successfully deployed  
- Database connected via MongoDB Atlas  
- Donation system functional (simulated payments)  
- Dashboard implemented  

---

## Future Enhancements

- Integration with real payment gateways (Razorpay or Stripe)  
- Email notifications and receipts  
- NGO registration and verification system  
- Admin dashboard  
- Password recovery system  

---

## Authors

- Mohan Narayanapuram  
- D. Pujith Ram Reddy  

---

## License

This project is developed for academic purposes.
