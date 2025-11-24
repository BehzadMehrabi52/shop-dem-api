import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// -------------------------
// 📌 اضافه کردن سرو عکس‌ها
// -------------------------
app.use("/images/products", express.static(path.join(process.cwd(), "public/products")));
app.use("/images/categories", express.static(path.join(process.cwd(), "public/categories")));

// -------------------------
// 📌 API Routes
// -------------------------
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
