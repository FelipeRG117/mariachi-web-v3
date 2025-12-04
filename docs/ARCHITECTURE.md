# 🏗️ Mariachi Web V3 - Architecture Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions)
- [Migration Status](#migration-status)
- [Best Practices](#best-practices)

---

## 🎯 Overview

This project is a professional **mariachi artist website** built with **Next.js 15** (App Router), **TypeScript**, and **Tailwind CSS**. The architecture follows **enterprise-grade best practices** with English naming conventions while maintaining Spanish content for the target audience.

### Key Architectural Decisions

✅ **English naming** for all code (folders, components, files)
✅ **Spanish content** for user-facing text
✅ **No index.ts barrel exports** - Direct imports for clarity
✅ **Separation of concerns** - UI, Business, Layout components
✅ **Type-safe** with centralized TypeScript types
✅ **Scalable** structure ready for backend integration

---

## 🔧 Technology Stack

### Core
- **Framework**: Next.js 15.4.5 (App Router + React Server Components)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 3.x + Ant Design components
- **Package Manager**: npm

### External Integrations
- **CMS**: Sanity.io (headless CMS)
- **Music API**: Spotify Web API (OAuth 2.0)
- **Image Optimization**: Next/Image with remote patterns

### Development Tools
- **Linter**: ESLint (Next.js config)
- **CSS Processing**: PostCSS
- **Type Checking**: TypeScript Compiler

---

## 📁 Folder Structure

### New Architecture (English Naming)

```
mariachi-web-v3/
├── 📂 src/
│   ├── 📂 app/                         # Next.js 15 App Router
│   │   ├── page.tsx                    # Home page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Global styles
│   │   │
│   │   ├── 📂 biografia/               # Biography page
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 discografia/             # Discography page
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 conciertos/              # Concerts page
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 galeria/                 # Gallery page
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 contacto/                # Contact page
│   │   │   └── page.tsx
│   │   │
│   │   └── 📂 tienda/                  # Store pages
│   │       ├── page.tsx                # Store listing
│   │       └── 📂 [id]/
│   │           └── page.tsx            # Product detail (dynamic route)
│   │
│   ├── 📂 components/                  # React Components (NEW STRUCTURE)
│   │   │
│   │   ├── 📂 ui/                      # Reusable UI Components
│   │   │   ├── 📂 Button/
│   │   │   │   └── Button.tsx
│   │   │   ├── 📂 Card/
│   │   │   │   └── Card.tsx
│   │   │   └── 📂 ErrorBoundary/
│   │   │       └── ErrorBoundary.tsx
│   │   │
│   │   ├── 📂 business/                # Business Logic Components
│   │   │   ├── 📂 AnnouncementModal/   # Modal announcements
│   │   │   │   ├── AnnouncementModal.tsx
│   │   │   │   └── AnnouncementModalWrapper.tsx
│   │   │   │
│   │   │   ├── 📂 DiscographyContainer/
│   │   │   │   ├── DiscographyContainer.tsx
│   │   │   │   ├── AlbumCard.tsx
│   │   │   │   ├── AlbumsList.tsx
│   │   │   │   ├── Banner.tsx
│   │   │   │   └── LastReleasesCarousel.tsx
│   │   │   │
│   │   │   ├── 📂 BiographyContainer/
│   │   │   │   ├── BiographyContainer.tsx
│   │   │   │   └── BiographyBanner.tsx
│   │   │   │
│   │   │   ├── 📂 ConcertsContainer/
│   │   │   │   ├── ConcertsContainer.tsx
│   │   │   │   ├── ConcertsList.tsx
│   │   │   │   └── ConcertCard.tsx
│   │   │   │
│   │   │   ├── 📂 StoreContainer/
│   │   │   │   ├── StoreContainer.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   └── ProductGrid.tsx
│   │   │   │
│   │   │   ├── 📂 NewsletterContainer/
│   │   │   │   ├── NewsletterContainer.tsx
│   │   │   │   └── InstagramConnectCard.tsx
│   │   │   │
│   │   │   ├── 📂 HomeContainer/
│   │   │   │   ├── HomeContainer.tsx
│   │   │   │   └── VideoBanner.tsx
│   │   │   │
│   │   │   ├── 📂 VideoGallery/
│   │   │   │   ├── VideoGalleryContainer.tsx
│   │   │   │   └── VideoCard.tsx
│   │   │   │
│   │   │   └── 📂 ContactForm/
│   │   │       └── ContactForm.tsx
│   │   │
│   │   ├── 📂 layout/                  # Layout Components
│   │   │   ├── NavBar.tsx              # Navigation bar
│   │   │   └── Footer.tsx              # Footer
│   │   │
│   │   └── 📂 common/                  # Common Shared Components
│   │       └── SectionBanner.tsx       # Reusable section banner
│   │
│   ├── 📂 types/                       # TypeScript Type Definitions
│   │   ├── 📂 common/                  # Common types
│   │   │   ├── base.types.ts           # Base types
│   │   │   ├── api.types.ts            # API response types
│   │   │   └── error.types.ts          # Error types
│   │   │
│   │   ├── 📂 business/                # Business domain types
│   │   │   ├── album.types.ts          # Album interfaces
│   │   │   ├── concert.types.ts        # Concert interfaces
│   │   │   ├── product.types.ts        # Product interfaces
│   │   │   └── announcement.types.ts   # Announcement interfaces
│   │   │
│   │   └── 📂 integrations/            # External API types
│   │       ├── spotify.types.ts        # Spotify API types
│   │       └── sanity.types.ts         # Sanity CMS types
│   │
│   ├── 📂 lib/                         # Business Logic & Utilities
│   │   ├── 📂 services/                # Business services
│   │   │   ├── album.service.ts        # Albums business logic
│   │   │   ├── concert.service.ts      # Concerts business logic
│   │   │   ├── product.service.ts      # Products business logic
│   │   │   └── announcement.service.ts # Announcements logic
│   │   │
│   │   ├── 📂 repositories/            # Data access layer
│   │   │   ├── album.repository.ts     # Album data access
│   │   │   ├── concert.repository.ts   # Concert data access
│   │   │   └── product.repository.ts   # Product data access
│   │   │
│   │   ├── 📂 integrations/            # External API integrations
│   │   │   ├── 📂 spotify/
│   │   │   │   ├── spotify.service.ts  # Spotify API client
│   │   │   │   └── spotify.config.ts   # Spotify config
│   │   │   │
│   │   │   └── 📂 sanity/
│   │   │       ├── sanity.service.ts   # Sanity CMS client
│   │   │       └── sanity.config.ts    # Sanity config
│   │   │
│   │   ├── 📂 utils/                   # Utility functions
│   │   │   ├── helpers.ts              # Generic helpers
│   │   │   ├── formatters.ts           # Data formatters
│   │   │   └── date-utils.ts           # Date utilities
│   │   │
│   │   └── 📂 config/                  # Configuration
│   │       ├── environment.ts          # Environment variables
│   │       └── constants.ts            # App constants
│   │
│   ├── 📂 data/                        # Static JSON Data
│   │   ├── albums.json                 # Albums data
│   │   ├── concerts.json               # Concerts data
│   │   ├── products.json               # Products data
│   │   └── announcements.json          # Announcements data
│   │
│   └── 📂 styles/                      # Global styles
│       └── globals.css                 # Tailwind + custom CSS
│
├── 📂 public/                          # Static assets
│   └── 📂 images/                      # Public images
│
├── 📂 docs/                            # Documentation
│   ├── ARCHITECTURE.md                 # This file
│   └── MIGRATION.md                    # Migration guide
│
├── 📄 next.config.ts                   # Next.js configuration
├── 📄 tailwind.config.ts               # Tailwind CSS config
├── 📄 tsconfig.json                    # TypeScript config
├── 📄 package.json                     # Dependencies
└── 📄 README.md                        # Project README
```

---

## 🎯 Naming Conventions

### Files & Folders
- **Folders**: `camelCase` (e.g., `components/business/DiscographyContainer/`)
- **Components**: `PascalCase.tsx` (e.g., `AlbumCard.tsx`)
- **Services**: `camelCase.service.ts` (e.g., `album.service.ts`)
- **Types**: `camelCase.types.ts` (e.g., `concert.types.ts`)
- **Utils**: `kebab-case.ts` (e.g., `date-utils.ts`)
- **Config**: `kebab-case.ts` (e.g., `environment.ts`)

### Code
- **Interfaces**: `PascalCase` with descriptive names (e.g., `Album`, `Concert`)
- **Functions**: `camelCase` (e.g., `getAlbums`, `formatDate`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- **React Components**: `PascalCase` (e.g., `AlbumCard`, `ConcertsList`)

### Import Patterns (NO index.ts)
```typescript
// ✅ CORRECT - Direct imports
import { AlbumCard } from '@/components/business/DiscographyContainer/AlbumCard'
import { Concert } from '@/types/business/concert.types'
import { concertService } from '@/lib/services/concert.service'

// ❌ WRONG - Barrel exports (removed)
import { AlbumCard } from '@/components'
import { Concert } from '@/types'
```

---

## 📊 Migration Status

### ✅ Completed
- [x] Eliminated problematic `index.ts` files (5 files removed)
- [x] Created new folder structure with English naming
- [x] Organized components into `ui/`, `business/`, `layout/`, `common/`
- [x] Created centralized `/types/` directory
- [x] Created `/lib/services/` and `/lib/repositories/` structure

### 🔄 In Progress
- [ ] Move existing components to new structure
- [ ] Convert TypeScript data files to JSON
- [ ] Create service layer implementations
- [ ] Update all imports to direct paths

### 📋 Pending
- [ ] Add Zod validation schemas
- [ ] Implement error handling patterns
- [ ] Add unit tests
- [ ] Create API routes (if needed)
- [ ] Backend integration preparation

---

## 🚀 Best Practices

### Component Organization

1. **UI Components** (`/components/ui/`)
   - Generic, reusable components
   - No business logic
   - Highly configurable via props
   - Examples: Button, Card, Modal

2. **Business Components** (`/components/business/`)
   - Domain-specific logic
   - Can use UI components
   - Contains feature-specific state
   - Examples: DiscographyContainer, ConcertsContainer

3. **Layout Components** (`/components/layout/`)
   - Page structure components
   - Navigation, headers, footers
   - Shared across multiple pages

4. **Common Components** (`/components/common/`)
   - Shared components that don't fit UI category
   - Often used across multiple business components

### Type Safety

- **All types centralized** in `/src/types/`
- **Strict TypeScript** configuration enabled
- **No `any` types** unless absolutely necessary
- **Interface over type** for object shapes

### Data Flow

```
JSON Data (data/)
  → Repository (lib/repositories/)
  → Service (lib/services/)
  → Component (components/)
```

### Import Aliases

```typescript
// Configured in tsconfig.json
"@/*" → "src/*"

// Usage examples
import { Album } from '@/types/business/album.types'
import { albumService } from '@/lib/services/album.service'
import { AlbumCard } from '@/components/business/DiscographyContainer/AlbumCard'
```

---

## 🔗 Related Documents

- [Migration Guide](./MIGRATION.md) - Step-by-step migration from old structure
- [Component Guide](./COMPONENTS.md) - Component usage documentation
- [Type Reference](./TYPES.md) - TypeScript types reference

---

## 📝 Notes

### Why No index.ts Files?

**Problems with barrel exports:**
- ❌ Confusing import paths
- ❌ Circular dependency risks
- ❌ Harder to trace component origins
- ❌ IDE auto-import issues
- ❌ Larger bundle sizes

**Benefits of direct imports:**
- ✅ Clear component locations
- ✅ Better tree-shaking
- ✅ Faster IDE navigation
- ✅ No circular dependencies
- ✅ Explicit dependencies

### English vs Spanish

**Code (English):**
```typescript
// File: components/business/DiscographyContainer/AlbumCard.tsx
export function AlbumCard({ album }: AlbumCardProps) {
  return <div>{album.title}</div>
}
```

**Content (Spanish):**
```typescript
// User-facing content remains in Spanish
<h1>Discografía</h1>
<p>Explora todos los álbumes de Luis Carlos Gago</p>
```

---

**Last Updated**: December 2024
**Version**: 3.0.0
**Maintained By**: Development Team
