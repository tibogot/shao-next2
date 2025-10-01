# SHAO Cosmetics SEO Metadata System

This document explains how to use the comprehensive SEO metadata system created for SHAO cosmetics.

## 📁 File Structure

```
src/
├── lib/
│   └── metadata.ts          # Main metadata configuration
├── app/
│   ├── metadata.ts          # Home page metadata
│   ├── about/
│   │   └── metadata.ts      # About page metadata
│   ├── sitemap.ts           # Dynamic sitemap generation
│   ├── robots.ts            # Robots.txt generation
│   └── manifest.ts          # PWA manifest generation
```

## 🎯 What's Included

### 1. **Core Metadata Configuration** (`src/lib/metadata.ts`)

- **Site Configuration**: Brand name, description, URLs, social links
- **Default Metadata**: Global SEO settings for all pages
- **Page-Specific Metadata**: Tailored metadata for each page type
- **Helper Functions**: Easy metadata generation for dynamic content

### 2. **SEO Features**

- **Title & Description**: Optimized for each page
- **Keywords**: Comprehensive beauty and skincare terms
- **Open Graph**: Perfect social media sharing
- **Twitter Cards**: Optimized Twitter sharing
- **Robots**: Search engine crawling instructions
- **Verification**: Google Search Console, Yandex, Yahoo
- **Structured Data**: Ready for rich snippets

### 3. **Technical SEO**

- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling rules
- **PWA Manifest**: Progressive Web App support
- **Canonical URLs**: Prevent duplicate content
- **Meta Tags**: Comprehensive meta information

## 🚀 How to Use

### Basic Page Metadata

For any page, import and use the appropriate metadata:

```tsx
// For home page
import { pageMetadata } from "../lib/metadata";
export const metadata = pageMetadata.home;

// For about page
export const metadata = pageMetadata.about;

// For shop page
export const metadata = pageMetadata.shop;
```

### Dynamic Product Metadata

For product pages with dynamic content:

```tsx
import { generateProductMetadata } from "../lib/metadata";

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.handle);

  return generateProductMetadata(
    product.title,
    product.description,
    product.featuredImage,
  );
}
```

### Custom Metadata

Override or extend default metadata:

```tsx
import { generateMetadata } from "../lib/metadata";

export const metadata = generateMetadata("home", {
  title: "Custom Title",
  description: "Custom description",
  openGraph: {
    title: "Custom OG Title",
  },
});
```

## 🔧 Configuration

### Update Site Configuration

Edit `src/lib/metadata.ts` to update:

```tsx
export const siteConfig = {
  name: "SHAO",
  url: "https://yourdomain.com", // Update with your domain
  ogImage: "/images/og-image.jpg", // Add your OG image
  links: {
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    tiktok: "https://tiktok.com/@yourhandle",
  },
};
```

### Add Google Search Console Verification

```tsx
verification: {
  google: "your-google-verification-code", // Add your code
  // ... other verification codes
}
```

### Customize Keywords

Update keywords for your specific products:

```tsx
keywords: [
  "natural skincare",
  "bio-fermentation",
  "sustainable beauty",
  // Add your specific keywords
],
```

## 📱 Social Media Optimization

### Open Graph Images

- **Size**: 1200x630px (optimal for social sharing)
- **Format**: JPG or PNG
- **Content**: Include your logo and product imagery
- **Placement**: `/public/images/og-image.jpg`

### Twitter Cards

- **Type**: Summary Large Image
- **Optimized**: For maximum engagement
- **Branding**: Consistent with your visual identity

## 🔍 Search Engine Optimization

### Meta Tags Included

- **Title**: Optimized for each page
- **Description**: Compelling and keyword-rich
- **Keywords**: Comprehensive beauty industry terms
- **Author**: SHAO Cosmetics
- **Robots**: Proper indexing instructions
- **Canonical**: Prevent duplicate content

### Structured Data Ready

The metadata system is prepared for:

- **Product Schema**: Rich product information
- **Organization Schema**: Company details
- **Review Schema**: Customer testimonials
- **FAQ Schema**: Common questions

## 📊 Performance & Best Practices

### Image Optimization

- **Next.js Image Component**: Automatic optimization
- **Responsive Images**: Multiple sizes for different devices
- **Lazy Loading**: Non-critical images deferred
- **WebP Format**: Modern, efficient image format

### Core Web Vitals

- **LCP**: Largest Contentful Paint optimization
- **CLS**: Cumulative Layout Shift prevention
- **FID**: First Input Delay optimization

## 🛠️ Maintenance

### Regular Updates

1. **Keywords**: Update based on trending terms
2. **Descriptions**: Refresh with new product launches
3. **Images**: Update OG images for campaigns
4. **URLs**: Keep sitemap current

### Monitoring

- **Google Search Console**: Track performance
- **PageSpeed Insights**: Monitor Core Web Vitals
- **Social Media**: Test sharing appearance

## 🎨 Brand Consistency

### Visual Identity

- **Colors**: #FBFBFB (your brand color)
- **Typography**: PP Neue Montreal fonts
- **Imagery**: Natural, sustainable, premium aesthetic

### Messaging

- **Tone**: Professional yet approachable
- **Values**: Sustainability, innovation, natural beauty
- **Target**: Conscious beauty consumers

## 📈 Expected Results

With this metadata system, expect:

- **Better Search Rankings**: Optimized for beauty industry
- **Improved Social Sharing**: Rich previews on all platforms
- **Enhanced User Experience**: Fast loading, accessible design
- **Brand Recognition**: Consistent messaging across channels
- **Mobile Optimization**: PWA-ready for app-like experience

## 🚨 Important Notes

1. **Update Domain**: Change `siteConfig.url` to your actual domain
2. **Add OG Image**: Create and add `/public/images/og-image.jpg`
3. **Google Verification**: Add your Search Console verification code
4. **Social Links**: Update with your actual social media URLs
5. **Product Images**: Ensure all product images are optimized

## 🆘 Troubleshooting

### Common Issues

- **Metadata Not Showing**: Check if page is client component
- **OG Images Not Working**: Verify image path and format
- **Sitemap Errors**: Check URL configuration
- **Robots Issues**: Verify disallow paths

### Need Help?

- Check Next.js metadata documentation
- Verify all imports are correct
- Ensure proper file structure
- Test with social media debuggers

---

**Created for SHAO Cosmetics** - Premium Natural Skincare & Cosmetics
_Innovative bio-fermentation technology for sustainable beauty_
