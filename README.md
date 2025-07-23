# 🛡️ Secure Tomorrow – Life Insurance Management Platform

A full-stack MERN web application designed to streamline life insurance policy management. Includes role-based dashboards, policy booking, claims, Stripe integration, and an admin control panel.

## 🔗 Live Website
[👉 Visit Live](https://your-deployed-site-url.com)

## 🚀 Features

### 👤 Authentication
- Firebase Auth (Email/Password, Google)
- Role-based login: Admin, Agent, Customer
- JWT-based secure API calls

### 🧭 Navigation
- Responsive Navbar & Footer
- Protected routes for dashboard access
- 404 Page Not Found

### 🏢 Role-based Dashboards
- **Admin**:
  - Manage Policies, Users, Blogs, Applications, Claims, Transactions
  - Assign agents, Approve/Reject applications
- **Agent**:
  - View assigned applications
  - Approve or reject claim requests
- **Customer**:
  - View available policies
  - Purchase via Stripe
  - Request for claims

### 💳 Stripe Integration
- Seamless payment system
- Updates policy status on success
- Stores transaction info in database

### 📦 Policy Management
- CRUD for Policies (Admin)
- Policy purchase with auto-filled info
- Application status handling
- Claim request feature with PDF/image upload

### 📈 Tech Stack
- **Frontend**: React 19, React Router v7, Tailwind CSS 4, DaisyUI
- **Backend**: Node.js, Express.js, MongoDB, Stripe
- **State Management**: React Query
- **Notifications**: SweetAlert2, React Toastify
- **Dev Tools**: Vite, ESLint

### 🎯 UX/UI Expectations Fulfilled
- No `Lorem Ipsum` anywhere
- Used SweetAlert2 / Toast for all interactions
- Dynamic page titles with `react-helmet-async`
- Fully responsive across devices

## 📁 Folder Structure

