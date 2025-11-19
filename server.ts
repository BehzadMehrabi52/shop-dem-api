import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5001;

// فعال کردن CORS
app.use(cors());

// خواندن فایل محصولات
const productsFile = path.join(__dirname, "data", "products.json");
let products: any[] = [];

const supportedLangs = ["fa", "en", "tr"];
const supportedCurrencies = ["IRR", "USD", "TRY"];

try {
  fs.readFile(productsFile, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading products.json:", err);
    } else {
      products = JSON.parse(data);
    }
  });
} catch (err) {
  console.error("Error reading products.json:", err);
}

// Middleware ساده برای تعیین زبان
const getText = (product: any, lang: string, currency: string) => {
  return {
    ...product,
    title: product.title[lang] || product.title["en"],
    description: product.description[lang] || product.description["en"],
    price: product.price[currency] || product.price["USD"]
  };
};

// لیست محصولات
app.get("/products", (req, res) => {
  const langParam = req.query.lang;
  const currencyParam = req.query.currency;

  let lang = "en";
  let currency = "USD";

  if (typeof langParam === "string" && supportedLangs.includes(langParam)) {
    lang = langParam;
  }

  if (typeof currencyParam === "string" && supportedCurrencies.includes(currencyParam)) {
    currency = currencyParam;
  }
  
  const mapped = products.map(p => getText(p, lang, currency));
  res.json(mapped);
});

// محصول مشخص
app.get("/products/:id", (req, res) => {
  const langParam = req.query.lang;
  const currencyParam = req.query.currency;

  let lang = "en";
  let currency = "USD";

  if (typeof langParam === "string" && supportedLangs.includes(langParam)) {
    lang = langParam;
  }

  if (typeof currencyParam === "string" && supportedCurrencies.includes(currencyParam)) {
    currency = currencyParam;
  }

  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(getText(product, lang, currency));
});

// app.use("/images", express.static(path.join(__dirname, "public/products")));

// شروع سرور
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
