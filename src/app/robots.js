// src/app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Example of folders you don't want indexed
    },
    sitemap: "https://www.greenwavepackaging.ca/sitemap.xml",
  };
}
