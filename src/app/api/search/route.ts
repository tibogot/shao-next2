import { NextRequest, NextResponse } from "next/server";
import { fetchAllProducts } from "../../../lib/shopify";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ products: [] });
    }

    // Get all products from Shopify
    const productsData = await fetchAllProducts(50); // Get up to 50 products for search
    const products = productsData.edges.map((edge: any) => edge.node);

    // Debug: Log the first product structure to see what fields are available
    if (products.length > 0) {
      console.log(
        "First product structure:",
        JSON.stringify(products[0], null, 2),
      );
    }

    // Simple search implementation - you can enhance this
    const searchResults = products.filter((product: any) => {
      const searchTerm = query.toLowerCase();
      const title = product.title?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      const vendor = product.vendor?.toLowerCase() || "";

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        vendor.includes(searchTerm)
      );
    });

    // Limit results to first 10 for performance
    const limitedResults = searchResults.slice(0, 10).map((product: any) => {
      // Try multiple image paths to find the correct one
      let imageUrl = "";
      if (product.images?.edges?.[0]?.node?.url) {
        imageUrl = product.images.edges[0].node.url;
      } else if (product.featuredImage?.url) {
        imageUrl = product.featuredImage.url;
      } else if (product.image?.url) {
        imageUrl = product.image.url;
      }

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        price: product.priceRange?.minVariantPrice?.amount || "0",
        image: imageUrl,
        description: product.description
          ? product.description.replace(/<[^>]*>/g, "").substring(0, 100) +
            "..."
          : "",
      };
    });

    return NextResponse.json({ products: limitedResults });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
