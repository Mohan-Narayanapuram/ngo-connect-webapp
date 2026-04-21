# NGO Connect Web Application

A full-stack MERN web application that connects donors with NGOs, enabling discovery of organizations, campaign participation, and seamless contribution to social causes.

---

## Overview

NGO Connect is designed to bridge the gap between donors and non-governmental organizations through a modern, scalable, and user-friendly platform. The application follows a modular MERN architecture and is built with a strong focus on clean UI/UX based on Figma design.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## Technologies Used

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,tailwind,js,html,css,git,github,vscode" />
</p>

---

## Features

- User Authentication (Login and Registration with JWT)
- NGO Listing with Filters (Location and Cause)
- Detailed NGO Profile Pages
- Campaign and Donation Interface (UI)
- Modular Backend with Controllers, Routes, Middleware
- MongoDB Database Integration
- Clean and Responsive UI based on Figma

---

## Project Structure

```
NGO-Connect-WebApp/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── donationController.js
│   │   └── ngoController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Ngo.js
│   │   └── Donation.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── ngoRoutes.js
│   │   └── donationRoutes.js
│   │
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NgoCard.jsx
│   │   │   ├── FilterDropdown.jsx
│   │   │   └── Icon.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── data/
│   │   │   └── ngos.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── NgoList.jsx
│   │   │   ├── NgoProfile.jsx
│   │   │   ├── DonatePage.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## Installation

### Clone Repository

```
git clone https://github.com/your-username/ngo-connect-webapp.git
cd ngo-connect-webapp
```

---

### Backend Setup

```
cd backend
npm install
npm run dev
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## Current Status

- Frontend UI: Not Fully Completed
- Routing: Implemented
- Database: Connected
- Backend APIs: Partially implemented
- Authentication: Functional
- Payment Integration: Pending

---

## Future Enhancements

- Complete API integration between frontend and backend
- Payment gateway integration (Razorpay/Stripe)
- User dashboard with analytics
- NGO verification system
- Real-time donation tracking

---

## Author

- D. Pujith Ram Reddy
- Mohan Narayanapuram

---

## License

This project is developed for academic purposes.
