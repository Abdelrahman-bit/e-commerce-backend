# E-Commerce Backend API

This is a **Node.js** backend API for an E-Commerce application.  
It is built with **Express.js**, **MongoDB (Mongoose)**, and uses JWT authentication.  
The API supports product management, orders, carts, authentication, and email notifications for password reset.

---

## 🚀 Features

- User authentication & role-based access control (Customer, Seller, Admin)
- Product CRUD (Create, Read, Update, Delete) with image upload support
- Order management
- Shopping cart management
- Password reset via email
- API error handling
- Pagination and filtering for product listing
- MongoDB database with Mongoose models

---

## 📂 Project Structure

e-commerce-backend/
│
├── controls/ # Route controllers (business logic)
├── middleware/ # Middleware (auth, error handling, file upload)
├── models/ # Mongoose schemas
├── utils/ # Helper functions
├── uploads/ # Uploaded images
├── .env # Environment variables
├── package.json
└── README.md

---

## ⚙️ Technologies Used

- **Node.js**  
- **Express.js**  
- **MongoDB** with **Mongoose**  
- **JWT** for authentication  
- **Multer** for image upload  
- **Nodemailer** for email notifications  
- **Postman** for API testing  
- **Vercel** for hosting  

---

## 📌 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/e-commerce-backend.git
cd e-commerce-backend
mkdir uploads
npm install
create .env:
MONGO_ATLAS_CONNECTION=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
NODEMAILER_USER_EMAIL=<your_email>
NODEMAILER_USER_PASS=<your_app_password>
SALT
PORT

```
🛠️ Running the Project
Development
npm run dev

📄 API Endpoints
Postman Documentation: https://documenter.getpostman.com/view/40733284/2sB3QCTE8f

📧 Password Reset Email

Uses Nodemailer to send password reset links.
Ensure your email credentials are stored in .env.

📦 Deployment
vercel

Push to GitHub

Structure backend as serverless functions

Deploy to Vercel

Add environment variables

🛡 Error Handling

All API errors are handled by a custom middleware that returns JSON with status and message.

📜 License

This project is licensed under the MIT License.

📧 Contact

Abdelrahman Mohamed
Email: abdelrahman.mohamed4030@gmail.com

Portfolio: https://abdelrahman-portfolio-3d.netlify.app

LinkedIn: https://www.linkedin.com/in/abdelrahman-mohamed-soliman-705b7a20b/

