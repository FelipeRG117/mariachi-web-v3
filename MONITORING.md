# 📊 Monitoring & Analytics Setup

This document covers all monitoring, analytics, and error tracking integrations for the Luis Carlos Gago e-commerce platform.

---

## 🎯 Overview

The application includes enterprise-level monitoring with:

- **Sentry** - Error tracking & performance monitoring
- **Google Analytics 4** - User behavior analytics & e-commerce tracking
- **Web Vitals** - Core Web Vitals monitoring (LCP, FID, CLS)
- **Error Boundaries** - Graceful error handling

---

## 🔴 Sentry - Error Tracking

### What is Sentry?

Sentry captures errors and performance issues in real-time, providing detailed stack traces, breadcrumbs, and session replays.

### Setup Instructions

#### 1. Create Sentry Account

1. Go to [sentry.io](https://sentry.io) and create a free account
2. Create a new project:
   - **Platform**: Next.js
   - **Project Name**: `mariachi-web`
   - **Team**: `luis-carlos-gago`

#### 2. Get Your DSN

After creating the project:

1. Navigate to **Settings** → **Projects** → **mariachi-web** → **Client Keys (DSN)**
2. Copy the DSN (looks like: `https://abc123@o123456.ingest.sentry.io/7890123`)

#### 3. Configure Environment Variables

**Local Development** (`.env.local`):
```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

**Production** (Vercel):
1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Key**: `NEXT_PUBLIC_SENTRY_DSN`
   - **Value**: Your Sentry DSN
   - **Environment**: Production, Preview

#### 4. Verify Installation

After deployment, trigger an error to test:

```javascript
// In browser console:
throw new Error("Test Sentry integration")
```

Check Sentry dashboard for the error.

### Configuration Files

- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime tracking
- `next.config.ts` - Sentry build integration

### Features Enabled

✅ **Error Tracking**: All JavaScript errors captured
✅ **Session Replay**: Visual playback of user sessions (errors only)
✅ **Performance Monitoring**: Track slow pages and API calls
✅ **Breadcrumbs**: See user actions before error
✅ **Source Maps**: Debug with original code (not minified)
✅ **Environment Detection**: Only tracks production errors

### Custom Error Tracking

```typescript
import * as Sentry from '@sentry/nextjs'

// Capture custom error
try {
  // risky code
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'checkout',
      user_type: 'guest',
    },
  })
}

// Capture custom message
Sentry.captureMessage('Payment gateway timeout', 'warning')
```

---

## 📈 Google Analytics 4 (GA4)

### What is Google Analytics 4?

GA4 tracks user behavior, traffic sources, and e-commerce conversions. Essential for understanding your audience.

### Setup Instructions

#### 1. Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create Account:
   - **Account Name**: `Luis Carlos Gago`
3. Create Property:
   - **Property Name**: `Mariachi Web`
   - **Reporting Time Zone**: `Mexico City (GMT-6)`
   - **Currency**: `Mexican Peso (MXN)`
4. Set up **Data Stream**:
   - **Platform**: Web
   - **Website URL**: `https://mariachi-web-v3.vercel.app` (your production URL)
   - **Stream Name**: `Mariachi Web Production`

#### 2. Get Measurement ID

After creating the data stream:

1. Click on your **Web Stream**
2. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

#### 3. Configure Environment Variables

**Local Development** (`.env.local`):
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Production** (Vercel):
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: Your GA4 Measurement ID
   - **Environment**: Production, Preview

#### 4. Enable Enhanced Measurement

In GA4 dashboard:

1. Go to **Admin** → **Data Streams** → Your stream
2. Enable **Enhanced Measurement**:
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads

#### 5. Configure E-commerce Reporting

1. Go to **Admin** → **Ecommerce Settings**
2. Enable **E-commerce** and **Enhanced E-commerce**

### E-commerce Events Tracked

The following events are automatically tracked:

| Event | Trigger | Data Sent |
|-------|---------|-----------|
| `view_item` | Product detail page view | Product ID, name, category, price |
| `add_to_cart` | Add to cart button clicked | Product + quantity |
| `remove_from_cart` | Remove from cart | Product + quantity |
| `begin_checkout` | Checkout page loaded | Cart items + total |
| `purchase` | Payment successful | Transaction ID, items, total, tax, shipping |
| `search` | Store search used | Search term |

### Custom Event Tracking

```typescript
import { trackEvent, trackAddToCart } from '@/components/analytics/GoogleAnalytics'

// Track custom event
trackEvent('newsletter_signup', {
  method: 'footer',
})

// Track add to cart (automatically called in ProductDetail)
trackAddToCart({
  id: product._id,
  name: product.name,
  category: product.category,
  price: getProductPrice(product),
  quantity: 1,
})
```

### Verify Installation

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Visit your site
3. Open browser console - you should see GA events firing
4. Check GA4 **Realtime** report - you should see yourself

---

## ⚡ Web Vitals Monitoring

### What are Core Web Vitals?

Google's metrics for measuring user experience:

- **LCP (Largest Contentful Paint)**: Loading performance (target: < 2.5s)
- **FID (First Input Delay)**: Interactivity (target: < 100ms)
- **CLS (Cumulative Layout Shift)**: Visual stability (target: < 0.1)

### How It Works

Web Vitals are automatically tracked and sent to:

1. **Google Analytics 4** - View in GA4 Reports
2. **Sentry Performance** - View in Sentry dashboard
3. **Browser Console** - Development mode only

### View Web Vitals Reports

**In Google Analytics 4:**

1. Go to **Reports** → **Engagement** → **Events**
2. Filter by event names: `LCP`, `FID`, `CLS`, `FCP`, `TTFB`, `INP`
3. View average values and distribution

**In Sentry:**

1. Go to **Performance** → **Web Vitals**
2. View metrics by page/route
3. Identify slow pages

### Improving Web Vitals

**LCP (Loading)**:
- ✅ Images optimized with Next.js `<Image>` (AVIF/WebP)
- ✅ Cloudinary CDN for fast delivery
- ✅ 60-day cache headers

**FID (Interactivity)**:
- ✅ Code splitting with dynamic imports
- ✅ Minimal JavaScript on initial load

**CLS (Layout Shift)**:
- ✅ Image dimensions specified
- ✅ Font preloading with `next/font`

---

## 🛡️ Error Boundaries

### What are Error Boundaries?

React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing.

### Files

- `src/components/errors/ErrorBoundary.tsx` - Reusable error boundary
- `src/app/error.tsx` - Global error page
- `src/app/not-found.tsx` - 404 page

### Usage

**Wrap sensitive components:**

```typescript
import { ErrorBoundary } from '@/components/errors/ErrorBoundary'

<ErrorBoundary>
  <CheckoutForm />
</ErrorBoundary>
```

**Global error handling:**

Next.js automatically uses `src/app/error.tsx` for all errors in the app directory.

---

## 🚀 Deployment Checklist

Before deploying to production, ensure:

### Environment Variables (Vercel)

Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

| Variable | Required | Environment | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_SENTRY_DSN` | Yes | Production, Preview | `https://abc@o123.ingest.sentry.io/456` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Yes | Production, Preview | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_API_URL` | Yes | Production, Preview | `https://api.example.com` |
| `NEXT_PUBLIC_BASE_URL` | Yes | Production | `https://luiscarlosgago.com` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Production | `pk_live_...` |

### Vercel Configuration

After adding environment variables:

1. **Redeploy** your application (Environment variables require redeploy)
2. Go to **Deployments** → latest deployment → **View Deployment**
3. Open browser console and verify:
   - No console errors
   - GA events firing
   - Sentry initialized

### Post-Deployment Verification

**✅ Sentry:**
1. Trigger a test error (browser console)
2. Check Sentry dashboard for error
3. Verify session replay works

**✅ Google Analytics:**
1. Visit site in incognito mode
2. Navigate between pages
3. Check GA4 **Realtime** report

**✅ Web Vitals:**
1. Run [PageSpeed Insights](https://pagespeed.web.dev/)
2. Check Core Web Vitals scores
3. Target: All metrics in "Good" range

---

## 📊 Dashboard Links

After setup, bookmark these dashboards:

| Service | Dashboard URL |
|---------|---------------|
| **Sentry** | `https://sentry.io/organizations/luis-carlos-gago/` |
| **Google Analytics** | `https://analytics.google.com/` |
| **Vercel Analytics** | `https://vercel.com/your-project/analytics` |
| **Google Search Console** | `https://search.google.com/search-console` |

---

## 🔍 Monitoring Best Practices

### Daily Monitoring

- Check **Sentry** for new errors (set up email alerts)
- Review **GA4 Realtime** for traffic anomalies

### Weekly Reviews

- Review **Web Vitals** trends
- Check **Top Pages** in GA4
- Review **Conversion Funnels** (Checkout flow)

### Monthly Reviews

- Analyze **Traffic Sources** (Organic, Direct, Social)
- Review **E-commerce Revenue** trends
- Identify **Top Products** by views/sales
- Review **User Demographics** (Location, Device)

### Setting Up Alerts

**Sentry Alerts:**

1. Go to **Alerts** → **Create Alert**
2. Configure:
   - **Condition**: `Number of events > 10 in 1 hour`
   - **Action**: Email team
3. Save alert

**GA4 Insights:**

1. Go to **Configure** → **Custom Insights**
2. GA4 will auto-suggest anomalies

---

## 🐛 Troubleshooting

### Sentry Not Capturing Errors

**Check:**
- ✅ `NEXT_PUBLIC_SENTRY_DSN` is set in Vercel
- ✅ Redeployed after adding env variable
- ✅ Error occurs in production (dev errors are filtered)
- ✅ Browser console shows: `[Sentry] SDK successfully initialized`

### GA4 Not Tracking

**Check:**
- ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID` format is `G-XXXXXXXXXX`
- ✅ Environment variable set in Vercel
- ✅ Redeployed after adding env variable
- ✅ Ad blockers disabled (test in incognito)
- ✅ Browser console shows: `gtag` function exists

### Web Vitals Not Showing in GA4

**Wait Time:**
- GA4 can take **24-48 hours** to show custom events
- Check **Realtime** report first (shows immediately)
- Then check **Events** report after 24h

---

## 📚 Additional Resources

### Official Documentation

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Google Analytics 4 Docs](https://support.google.com/analytics/answer/10089681)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Monitoring](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

### Learning Resources

- [GA4 E-commerce Guide](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Sentry Performance Best Practices](https://docs.sentry.io/product/performance/)
- [Improving Core Web Vitals](https://web.dev/vitals/)

---

## 🎓 Next Steps

After monitoring is live:

1. **Google Search Console**
   - Verify site ownership
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`
   - Monitor indexing status

2. **Performance Optimization**
   - Review Lighthouse scores monthly
   - Target: 90+ on all metrics
   - Use Vercel Analytics for detailed insights

3. **A/B Testing** (Future)
   - Use GA4 experiments
   - Test checkout flows
   - Optimize conversion rates

4. **User Feedback** (Future)
   - Add Hotjar or similar for heatmaps
   - Implement feedback widgets
   - Conduct user surveys

---

**Last Updated**: 2025-12-09
**Maintained By**: Development Team
