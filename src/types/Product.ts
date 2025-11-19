export interface TranslatedText {
  fa: string;
  en: string;
  tr: string;
}

export interface ProductPrice {
  IRR: number;
  USD: number;
  TRY: number;
}

export interface Product {
  id: number;
  category_id: number;
  title: TranslatedText;
  description: TranslatedText;
  images: string[];
  price: ProductPrice;
}
