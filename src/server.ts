import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();
const PORT = 5001;

app.use(cors());

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
