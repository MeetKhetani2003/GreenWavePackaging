// src/app/sitemap.js
import { ALL_PRODUCTS_DATA } from "@/app/AllProducts";

export default async function sitemap() {
  const baseUrl = "https://www.greenwavepackaging.ca";

  const staticRoutes = ["", "/about", "/product", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = ALL_PRODUCTS_DATA.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
