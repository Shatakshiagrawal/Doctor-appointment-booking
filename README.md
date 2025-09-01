# 🩺 Prescripto - Doctor Appointment Booking Web App

Prescripto is a full-stack Doctor Appointment Booking System with dedicated panels for Admin, Doctor, and User.  
This platform allows users to book, manage, and cancel appointments with doctors, while doctors and admins manage schedules and availability.

---

## 🚀 Features

### 👨‍💻 User Panel
- Browse doctors by speciality.
- Book new appointments.
- Cancel existing appointments.
- View doctor availability.

### 👨‍⚕️ Doctor Panel
- View upcoming appointments.
- Cancel appointments if needed.
- Mark appointments as completed.
- Update availability schedule.

### 🛠️ Admin Panel
- Manage users and doctors.
- Monitor appointment statistics.
- Ensure smooth workflow across the system.

---

## 🛠️ Tech Stack

- Frontend: React (with Vite) ⚡  
- Backend: Node.js + Express.js  
- Database: MongoDB (Mongoose ODM)  
- Authentication: JWT (JSON Web Token)  
- Styling: TailwindCSS  

---

## 📂 Project Structure

```
prescripto/
│
├── client/                 # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/                 # Node.js + Express backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes (users, doctors, admin, appointments)
│   ├── controllers/        # API logic
│   └── ...
│
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/prescripto.git
cd prescripto
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside `server/` with the following content:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

The app should now be running at:  
👉 Frontend: http://localhost:5173  
👉 Backend: http://localhost:5000  

---

## 🔒 Authentication Flow
- Users register/login using email & password.  
- JWT tokens secure routes for User, Doctor, and Admin.  
- Role-based access control ensures each panel has unique privileges.  

---

## 📌 Roadmap / Future Enhancements
- [ ] Appointment reminders via email/SMS.  
- [ ] Payment gateway integration.  
- [ ] Analytics dashboard for admins.  
- [ ] Multi-language support.  

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to fork and submit a PR.
