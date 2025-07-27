# Life Insurance Management Platform

A full-stack **MERN**-based Life Insurance Management Platform with **Role-based Authentication, Secure Payments, and Dynamic Policy Management**.

## Live Site
🔗 [Live Demo](https://tomorrow-130f9.web.app/)

## Admin Login Credentials
- **Email:** hasans@hasan.com  
- **Password:**  aA1234 

(Use the above credentials to log in as an Admin.)

---

## Features

1. **Role-based Authentication** (Admin, Agent, User) using Firebase + JWT for secure login and route protection.  
2. **Secure API Integration** with Axios (credentials included) and protected routes for sensitive data.  
3. **Dynamic Policy Listing** with backend-powered filtering (by category) and pagination (9 per page).  
4. **Policy Details Page** with images, category, full description, and premium-related details.  
5. **Quote Calculator Page** – Users can estimate life insurance premiums based on age, gender, coverage, smoker status, and duration.  
6. **Application Form Page** – Users can submit personal, nominee, and health details for insurance applications (default `Pending` status).  
7. **Stripe Payment Integration** for secure online premium payments.  
8. **Admin Dashboard** – Admins can approve/reject user applications, manage policies, and view transactions.  
9. **Agent Dashboard** – Agents can track assigned clients and monitor sales performance.  
10. **User Dashboard** – Users can view policies, track application status, and manage payments.  
11. **Responsive UI** with custom design, optimized for both mobile and desktop.  
12. **Notifications & Alerts** using SweetAlert2 and Toastify for smooth user feedback.  
13. **Secure Backend** – JWT-based middleware ensures only authorized users can access private endpoints.  
14. **Modern Tech Stack** – React, Node.js, Express.js, MongoDB, Firebase, TanStack Query, Stripe.  

---

## Tech Stack
- **Frontend:** React, Tailwind CSS, TanStack Query, Firebase Auth  
- **Backend:** Node.js, Express.js, MongoDB, JWT  
- **Payments:** Stripe Integration  
- **Hosting:** Vercel (Frontend) & Render (Backend)

---

## How to Run Locally

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/insurance-platform.git
   cd insurance-platform
