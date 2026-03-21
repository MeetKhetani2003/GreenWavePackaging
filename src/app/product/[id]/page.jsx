import { ALL_PRODUCTS_DATA } from "@/app/AllProducts";
import ProductDetailPage from "./ProductDetailClient";

// Generate static pages for all products
export function generateStaticParams() {
  return ALL_PRODUCTS_DATA.map((p) => ({
    id: p.id,
  }));
}

// Dynamic SEO
export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = ALL_PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.fullDescription.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.fullDescription.slice(0, 160),
      images: [{ url: product.detailImages[0] }],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  const product = ALL_PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.detailImages,
    description: product.fullDescription,
    brand: {
      "@type": "Brand",
      name: "Green Wave Packaging",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailPage product={product} />
    </>
  );
}
