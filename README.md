# Employee Management Server

## Overview
This is the backend server for the **Employee Management System**. It is built using **Node.js**, **Express.js**, and **MongoDB**. The server handles API requests related to employee data, worksheets, news updates, and payment requests.

## Features
- User management (Add, View, Update Users)
- Employee worksheets (CRUD operations)
- Latest news updates
- Payment request handling
- Secure database connection with **MongoDB Atlas**

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **CORS** for handling cross-origin requests
- **Dotenv** for managing environment variables

## Installation & Setup

### Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### Steps to Set Up Locally
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd Employee_Management_Server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000`

## API Endpoints

### User Routes
- **Get all users**: `GET /User`
- **Get specific user**: `GET /User/:id`
- **Add new user**: `POST /User`
- **Update user**: `PATCH /User/:id`

### Work Sheet Routes
- **Get all worksheets**: `GET /WorkSheet`
- **Get specific worksheet**: `GET /WorkSheet/:id`
- **Add new worksheet**: `POST /WorkSheet`
- **Update worksheet**: `PATCH /WorkSheet/:id`
- **Delete worksheet**: `DELETE /WorkSheet/:id`

### Latest News Routes
- **Get all news**: `GET /latest-news`
- **Get specific news**: `GET /latest-news/:id`

### Payment Request Routes
- **Get all payment requests**: `GET /Payment_Request`
- **Add new payment request**: `POST /Payment_Request`
- **Update payment request**: `PATCH /Payment_Request/:id`

## Deployment
This server can be deployed using **Vercel** or **Render**. Ensure that environment variables are configured correctly in the deployment settings.

## License
This project is open-source and free to use.

---
Developed by **Nur Mahammad Mondol Robiul**

