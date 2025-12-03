# 🛒 Shop API — Backend Service for E-Commerce Demo (Node.js)

A lightweight backend API built with **Node.js** to support the e-commerce frontend (`shop-ui`).  
This service provides product data, category data, and checkout functionality using **mock data**, simulating a real backend environment for demo and development purposes.

---

## 🚀 Features

### 📦 Product & Category Backend
- Serves products and categories using in-memory mock data  
- Fast responses without any database dependency  
- Backend logic separated cleanly from frontend

### 🛒 Cart & Checkout Logic
- Accepts checkout requests from the frontend  
- Validates incoming data (demo-level validation)  
- Returns a simulated **Order Receipt**  
- No third-party payment integrations (demo environment)

### 🎭 Mock Data
- Products  
- Categories  
- Pricing information  
- Fake order receipts  
- All stored locally for simplicity

> No database or external service is needed.

---

## 🔗 Frontend Integration

This backend powers the **Shop UI** frontend application (`shop-ui`).  
The frontend communicates with this service through standard REST calls.

Backend is fully decoupled from UI and can be replaced or extended easily.

---

## 🧰 Tech Stack

- **Node.js**  
- **Express.js** (در صورت استفاده — اگر چیز دیگری است بگو اصلاح کنم)  
- Mock JSON/data files  
- REST API architecture

---

## ▶️ Running the Project

```bash
npm install
npm start

Backend will run at:
http://localhost:5001
