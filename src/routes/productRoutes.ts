import { Router, Request, Response } from "express";
import productsJson from "../data/products.json";
import { Product } from "../types/Product";

const router = Router();
const products: Product[] = productsJson;

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const supportedLangs = ["fa", "en", "tr"] as const;
const supportedCurrencies = ["IRR", "USD", "TRY"] as const;

const getText = (product: Product, lang: string, currency: string) => {
  return {
    ...product,
    title: product.title[lang as "fa" | "en" | "tr"] || product.title.en,
    description: product.description[lang as "fa" | "en" | "tr"] || product.description.en,
    price: product.price[currency as "IRR" | "USD" | "TRY"] || product.price.USD,
    images: product.images.map(img => `${BASE_URL}/images${img}`)
  };
};

// ##############################
//  GET /products
// ##############################
router.get("/", (req: Request, res: Response) => {
  const { lang, currency, category_id } = req.query as {
    lang?: string;
    currency?: string;
    category_id?: string;
  };

  // Defaults
  const finalLang = supportedLangs.includes(lang as any) ? lang! : "en";
  const finalCurrency = supportedCurrencies.includes(currency as any) ? currency! : "USD";

  let result = products.map(p => getText(p, finalLang, finalCurrency));

  res.json(result);
});

// ##############################
//  GET /products/:id
// ##############################
router.get("/:id", (req: Request, res: Response) => {
  const { lang, currency } = req.query as {
    lang?: string;
    currency?: string;
  };

  const finalLang = supportedLangs.includes(lang as any) ? lang! : "en";
  const finalCurrency = supportedCurrencies.includes(currency as any) ? currency! : "USD";

  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product)
    return res.status(404).json({ error: "Product not found" });

  res.json(getText(product, finalLang, finalCurrency));
});

export default router;
