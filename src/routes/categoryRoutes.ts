import { Router, Request, Response } from "express";
import categoriesJson from "../data/categories.json";
import { Category } from "../types/Category";
import productsJson from "../data/products.json";
import { Product } from "../types/Product";

const router = Router();
const categories: Category[] = categoriesJson;

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const supportedLangs = ["fa", "en", "tr"] as const;

// ترجمه کتگوری
const translateCategory = (category: Category, lang: string) => {
  return {
    ...category,
    title: category.title[lang as "fa" | "en" | "tr"] || category.title.en,
    image: `${BASE_URL}/images${category.image}`
  };
};

// ##############################
//  GET /categories
// ##############################
router.get("/", (req: Request, res: Response) => {
  const { lang } = req.query as { lang?: string };

  const finalLang = supportedLangs.includes(lang as any) ? lang! : "en";

  const translated = categories.map(c => translateCategory(c, finalLang));
  res.json(translated);
});

// ##############################
//  GET /categories/:id
// ##############################
router.get("/:id", (req: Request, res: Response) => {
  const { lang } = req.query as { lang?: string };

  const finalLang = supportedLangs.includes(lang as any) ? lang! : "en";

  const id = Number(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(translateCategory(category, finalLang));
});

// ##############################
//  GET /categories/:id/products
// ##############################
router.get("/:id/products", (req: Request, res: Response) => {
  const { lang, currency } = req.query as {
    lang?: string;
    currency?: string;
  };

  const supportedLangs = ["fa", "en", "tr"] as const;
  const supportedCurrencies = ["IRR", "USD", "TRY"] as const;

  const finalLang = supportedLangs.includes(lang as any) ? lang! : "en";
  const finalCurrency = supportedCurrencies.includes(currency as any)
    ? currency!
    : "USD";

  const id = Number(req.params.id);

  const products: Product[] = productsJson;

  const filtered = products
    .filter(p => p.category_id === id)
    .map(p => ({
      ...p,
      title: p.title[finalLang as "fa" | "en" | "tr"],
      description: p.description[finalLang as "fa" | "en" | "tr"],
      price: p.price[finalCurrency as "IRR" | "USD" | "TRY"],
      images: p.images.map(img => `${BASE_URL}/images${img}`)
    }));

  res.json(filtered);
});

export default router;
