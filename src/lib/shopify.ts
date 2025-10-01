import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// Check if environment variables are available
const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

let client: any = null;

if (storeDomain && accessToken) {
  client = createStorefrontApiClient({
    storeDomain,
    publicAccessToken: accessToken,
    apiVersion: "2025-10",
  });
}

export async function fetchProducts(limit = 4) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return [];
  }

  const query = `
    {
      products(first: ${limit}, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            availableForSale
            images(first: 1) { edges { node { url } } }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.request(query);
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function fetchAllProducts(pageSize = 12, cursor?: string) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }

  const query = `
    {
      products(first: ${pageSize}${cursor ? `, after: \"${cursor}\"` : ""}, sortKey: CREATED_AT, reverse: true) {
        pageInfo { hasNextPage, endCursor }
        edges {
          node {
            id
            title
            handle
            description
            vendor
            availableForSale
            images(first: 1) { edges { node { url } } }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.request(query);
    return data.products;
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
}

export async function fetchProductsByVendor(vendor: string, limit = 4) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return [];
  }

  const query = `
    {
      products(first: ${limit}, query: "vendor:${vendor}") {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            availableForSale
            images(first: 1) { edges { node { url } } }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.request(query);
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Failed to fetch products by vendor:", error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return null;
  }

  const query = `
    {
      product(handle: \"${handle}\") {
        id
        title
        handle
        description
        descriptionHtml
        vendor
        productType
        tags
        availableForSale
        createdAt
        updatedAt
        publishedAt
        images(first: 10) { 
          edges { 
            node { 
              id
              url
              altText
              width
              height
            } 
          } 
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                id
                url
                altText
              }
            }
          }
        }
        options {
          id
          name
          values
        }
        priceRange { 
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        metafields(identifiers: [
          {namespace: "custom", key: "ingredients"},
          {namespace: "custom", key: "how_to_use"},
          {namespace: "custom", key: "benefits"},
          {namespace: "custom", key: "skin_type"}
        ]) {
          key
          value
          type
          namespace
        }
        seo {
          title
          description
        }
      }
    }
  `;

  try {
    const { data } = await client.request(query);
    return data.product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Fetch related products by similar tags or vendor
export async function fetchRelatedProducts(
  productId: string,
  tags: string[],
  vendor: string,
  limit = 6,
) {
  if (!client) {
    console.warn(
      "Shopify client not configured - missing environment variables",
    );
    return [];
  }

  // Create query based on tags or vendor
  const tagQuery = tags
    .slice(0, 3)
    .map((tag) => `tag:${tag}`)
    .join(" OR ");

  // Build query more intelligently
  let fullQuery = "";
  if (tagQuery && tagQuery.length > 0) {
    fullQuery = `${tagQuery} OR vendor:${vendor}`;
  } else {
    // If no tags, only search by vendor
    fullQuery = `vendor:${vendor}`;
  }

  // Debug logging
  console.log("🔍 Related Products Debug:");
  console.log("- Product ID:", productId);
  console.log("- Tags:", tags);
  console.log("- Vendor:", vendor);
  console.log("- Tag Query:", tagQuery);
  console.log("- Full Query:", fullQuery);

  const query = `
    {
      products(first: ${limit + 1}, query: "${fullQuery}") {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            tags
            availableForSale
            images(first: 1) { 
              edges { 
                node { 
                  url
                  altText
                } 
              } 
            }
            priceRange { 
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.request(query);
    console.log("- Raw Results:", data.products.edges.length, "products found");
    console.log(
      "- Results:",
      data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        tags: edge.node.tags,
        vendor: edge.node.vendor,
      })),
    );

    // Filter out the current product and return others
    const filtered = data.products.edges
      .map((edge: any) => edge.node)
      .filter((product: any) => product.id !== productId)
      .slice(0, limit);

    console.log(
      "- Filtered Results:",
      filtered.length,
      "products after filtering",
    );
    console.log(
      "- Final Products:",
      filtered.map((p: any) => p.title),
    );

    return filtered;
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}
