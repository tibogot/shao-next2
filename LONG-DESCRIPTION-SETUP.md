# Long Description Setup Guide

## Overview

Your product page now supports both a short description (from the standard Shopify description field) and a detailed description (from a custom metafield). This allows you to have:

- **Short Description**: Used for quick product overviews, cards, and brief summaries
- **Detailed Description**: Used for comprehensive product information on the product page

## How to Set Up the Long Description Metafield

### 1. Access Shopify Admin

1. Log into your Shopify admin panel
2. Look for **"Metafields"** in the left sidebar menu
3. If not visible, try **Settings** → **Metafields** or **Settings** → **Custom data** → **Metafields**

### 2. Create the Metafield

1. Click **Add definition** or **Create metafield**
2. Configure the metafield:
   - **Name**: `Long Description`
   - **Namespace and key**: `custom.long_description`
   - **Description**: `Detailed product description for the product page`
   - **Type**: `Multi-line text` or `Rich text`
   - **Access**: `Storefront API`

### Alternative: If Metafields Aren't Available

If you can't find metafields in your Shopify plan, the code will automatically fall back to using your existing product description for the detailed section if it's longer than 500 characters.

### 3. Add Content to Your Products

1. Go to **Products** in your Shopify admin
2. Edit any product
3. Scroll down to the **Metafields** section
4. Find the **Long Description** field
5. Add your detailed description content

## Usage in Your Store

### Short Description (Standard)

- Used in product cards and quick views
- Limited to essential information
- Fetched from the standard `description` field

### Detailed Description (Metafield)

- Used in the product page accordion
- Can include rich formatting (if using Rich text type)
- Supports HTML content for better formatting
- Only shows if content is available

## Code Implementation

The implementation automatically:

1. Fetches the `long_description` metafield from Shopify
2. Displays it in a separate accordion section
3. Falls back gracefully if no content is provided
4. Supports HTML formatting for rich content

## Benefits

1. **Flexibility**: Separate content for different contexts
2. **SEO**: Short descriptions for meta descriptions, long for detailed content
3. **User Experience**: Quick overview + detailed information when needed
4. **Maintainability**: Easy to update without affecting other parts of your store

## Example Content Structure

**Short Description** (Standard field):

```
Premium organic face cream with natural ingredients for daily skincare routine.
```

**Long Description** (Metafield):

```
<h3>Why Choose Our Premium Face Cream?</h3>
<p>Our carefully crafted formula combines the finest organic ingredients to deliver exceptional results for your daily skincare routine.</p>

<h4>Key Benefits:</h4>
<ul>
  <li>Hydrates and nourishes skin for 24 hours</li>
  <li>Reduces fine lines and wrinkles</li>
  <li>Protects against environmental damage</li>
  <li>Suitable for all skin types</li>
</ul>

<h4>How to Use:</h4>
<p>Apply a small amount to clean skin morning and evening. Gently massage in circular motions until fully absorbed.</p>
```

## Troubleshooting

If the detailed description doesn't appear:

1. Check that the metafield is created with namespace `custom` and key `long_description`
2. Verify the metafield has content in your product
3. Ensure the metafield is accessible via the Storefront API
4. Check browser console for any JavaScript errors
