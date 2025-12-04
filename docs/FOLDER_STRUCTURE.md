# 📁 Complete Folder Structure - Visual Guide

## 🌳 Full Directory Tree

```
mariachi-web-v3/
│
├── 📂 .next/                           # Next.js build output (ignored)
├── 📂 node_modules/                    # Dependencies (ignored)
│
├── 📂 public/                          # Static public assets
│   ├── 📂 images/                      # Public images
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   └── qr-code-losplebes-2.png
│   └── favicon.ico
│
├── 📂 src/                             # Source code (MAIN FOLDER)
│   │
│   ├── 📂 app/                         # Next.js 15 App Router
│   │   ├── favicon.ico
│   │   ├── globals.css                 # Global styles
│   │   ├── layout.tsx                  # Root layout with metadata
│   │   ├── page.tsx                    # Home page
│   │   │
│   │   ├── 📂 biografia/               # Biography page route
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 conciertos/              # Concerts page route
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 contacto/                # Contact page route
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 discografia/             # Discography page route
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 galeria/                 # Gallery page route
│   │   │   └── page.tsx
│   │   │
│   │   └── 📂 tienda/                  # Store routes
│   │       ├── page.tsx                # Store listing page
│   │       └── 📂 [id]/                # Dynamic product route
│   │           └── page.tsx            # Product detail page
│   │
│   ├── 📂 components/                  # React Components (NEW STRUCTURE)
│   │   │
│   │   ├── 📂 ui/                      # 🎨 Reusable UI Components
│   │   │   │                           # Generic components with no business logic
│   │   │   │
│   │   │   ├── 📂 Button/
│   │   │   │   ├── Button.tsx          # ⏳ TO CREATE
│   │   │   │   └── Button.test.tsx     # ⏳ TO CREATE
│   │   │   │
│   │   │   ├── 📂 Card/
│   │   │   │   ├── Card.tsx            # ⏳ TO CREATE
│   │   │   │   └── Card.test.tsx       # ⏳ TO CREATE
│   │   │   │
│   │   │   ├── 📂 Modal/
│   │   │   │   ├── Modal.tsx           # ⏳ TO CREATE
│   │   │   │   └── Modal.test.tsx      # ⏳ TO CREATE
│   │   │   │
│   │   │   └── 📂 ErrorBoundary/
│   │   │       ├── ErrorBoundary.tsx   # ⏳ TO CREATE
│   │   │       └── ErrorBoundary.test.tsx # ⏳ TO CREATE
│   │   │
│   │   ├── 📂 business/                # 🎵 Business Logic Components
│   │   │   │                           # Domain-specific components
│   │   │   │
│   │   │   ├── 📂 AnnouncementModal/   # ✅ EXISTS (needs refactor)
│   │   │   │   ├── AnnouncementModal.tsx
│   │   │   │   └── AnnouncementModalWrapper.tsx
│   │   │   │
│   │   │   ├── 📂 BiographyContainer/  # ✅ EXISTS (needs cleanup)
│   │   │   │   ├── BiographyContainer.tsx
│   │   │   │   └── BiographyBanner.tsx
│   │   │   │
│   │   │   ├── 📂 DiscographyContainer/ # ✅ EXISTS (needs reorganization)
│   │   │   │   ├── DiscographyContainer.tsx
│   │   │   │   ├── AlbumCard.tsx       # 📦 TO MOVE from components/
│   │   │   │   ├── AlbumsList.tsx      # 📦 TO MOVE from components/
│   │   │   │   ├── Banner.tsx          # 📦 TO MOVE from components/
│   │   │   │   ├── DiscographyBanner.tsx # 📦 TO MOVE from components/
│   │   │   │   └── LastReleasesCarousel.tsx # 📦 TO MOVE from components/
│   │   │   │
│   │   │   ├── 📂 ConcertsContainer/   # ⏳ TO CREATE
│   │   │   │   ├── ConcertsContainer.tsx
│   │   │   │   ├── ConcertsList.tsx    # 📦 TO MOVE (NextConcertsList)
│   │   │   │   └── ConcertCard.tsx     # ⏳ TO CREATE
│   │   │   │
│   │   │   ├── 📂 StoreContainer/      # ✅ EXISTS (needs reorganization)
│   │   │   │   ├── StoreContainer.tsx  # 📦 TO MOVE (storeComponent)
│   │   │   │   ├── ProductCard.tsx     # 📦 TO MOVE (productCard)
│   │   │   │   ├── ProductDetail.tsx   # 📦 TO MOVE (productDetail)
│   │   │   │   └── ProductGrid.tsx     # ⏳ TO CREATE
│   │   │   │
│   │   │   ├── 📂 NewsletterContainer/ # ✅ EXISTS (needs cleanup)
│   │   │   │   ├── NewsletterContainer.tsx
│   │   │   │   └── InstagramConnectCard.tsx
│   │   │   │
│   │   │   ├── 📂 HomeContainer/       # ✅ EXISTS (needs cleanup)
│   │   │   │   ├── HomeContainer.tsx
│   │   │   │   ├── VideoBanner.tsx     # 📦 TO MOVE
│   │   │   │   └── WelcomeSection.tsx  # 📦 TO MOVE (WelcomeContainer)
│   │   │   │
│   │   │   ├── 📂 VideoGallery/        # ✅ EXISTS (needs refactor)
│   │   │   │   ├── VideoGalleryContainer.tsx
│   │   │   │   └── VideoCard.tsx       # ⏳ TO CREATE
│   │   │   │
│   │   │   └── 📂 ContactForm/         # ✅ EXISTS (needs refactor)
│   │   │       ├── ContactForm.tsx     # 📦 TO MOVE (contactComponent)
│   │   │       └── ContactFormFields.tsx # ⏳ TO CREATE
│   │   │
│   │   ├── 📂 layout/                  # 📱 Layout Components
│   │   │   │                           # Page structure components
│   │   │   │
│   │   │   ├── NavBar.tsx              # 📦 TO MOVE from NavBar/NavBar.tsx
│   │   │   └── Footer.tsx              # 📦 TO MOVE (FooterComponent)
│   │   │
│   │   └── 📂 common/                  # 🔧 Common Shared Components
│   │       │                           # Shared across multiple features
│   │       │
│   │       └── SectionBanner.tsx       # ✅ EXISTS
│   │
│   ├── 📂 types/                       # 📝 TypeScript Type Definitions
│   │   │
│   │   ├── 📂 common/                  # Common/shared types
│   │   │   ├── base.types.ts           # ⏳ TO CREATE
│   │   │   ├── api.types.ts            # ⏳ TO CREATE
│   │   │   └── error.types.ts          # ⏳ TO CREATE
│   │   │
│   │   ├── 📂 business/                # Business domain types
│   │   │   ├── album.types.ts          # ⏳ TO CREATE (extract from albums.ts)
│   │   │   ├── concert.types.ts        # ⏳ TO CREATE (extract from concerts.ts)
│   │   │   ├── product.types.ts        # ✅ EXISTS (needs cleanup)
│   │   │   └── announcement.types.ts   # ⏳ TO CREATE (extract from announcements.ts)
│   │   │
│   │   └── 📂 integrations/            # External API types
│   │       ├── spotify.types.ts        # ⏳ TO CREATE (extract from spotify.ts)
│   │       └── sanity.types.ts         # ⏳ TO CREATE (extract from sanity.ts)
│   │
│   ├── 📂 lib/                         # 🔧 Business Logic & Utilities
│   │   │
│   │   ├── 📂 services/                # Business services layer
│   │   │   ├── album.service.ts        # ⏳ TO CREATE
│   │   │   ├── concert.service.ts      # ⏳ TO CREATE
│   │   │   ├── product.service.ts      # ⏳ TO CREATE
│   │   │   ├── announcement.service.ts # ⏳ TO CREATE
│   │   │   └── gallery.service.ts      # ⏳ TO CREATE
│   │   │
│   │   ├── 📂 repositories/            # Data access layer
│   │   │   ├── album.repository.ts     # ⏳ TO CREATE
│   │   │   ├── concert.repository.ts   # ⏳ TO CREATE
│   │   │   └── product.repository.ts   # ⏳ TO CREATE
│   │   │
│   │   ├── 📂 integrations/            # External API integrations
│   │   │   │
│   │   │   ├── 📂 spotify/
│   │   │   │   ├── spotify.service.ts  # 📦 TO REFACTOR (from spotify.ts)
│   │   │   │   └── spotify.config.ts   # ⏳ TO CREATE
│   │   │   │
│   │   │   └── 📂 sanity/
│   │   │       ├── sanity.service.ts   # 📦 TO REFACTOR (from sanity.ts)
│   │   │       └── sanity.config.ts    # ⏳ TO CREATE
│   │   │
│   │   ├── 📂 data/                    # ⚠️ OLD STRUCTURE (TO REFACTOR)
│   │   │   ├── albums.ts               # 📦 TO CONVERT → data/albums.json
│   │   │   ├── concerts.ts             # 📦 TO CONVERT → data/concerts.json
│   │   │   ├── products.ts             # 📦 TO CONVERT → data/products.json
│   │   │   ├── announcements.ts        # 📦 TO CONVERT → data/announcements.json
│   │   │   ├── navigation.ts           # ✅ KEEP (navigation config)
│   │   │   └── ❌ index.ts (REMOVED)
│   │   │
│   │   ├── 📂 utils/                   # Utility functions
│   │   │   ├── helpers.ts              # ⏳ TO CREATE
│   │   │   ├── formatters.ts           # ⏳ TO CREATE
│   │   │   └── date-utils.ts           # ⏳ TO CREATE
│   │   │
│   │   ├── 📂 config/                  # Configuration files
│   │   │   ├── environment.ts          # ⏳ TO CREATE
│   │   │   └── constants.ts            # ⏳ TO CREATE
│   │   │
│   │   ├── sanity.ts                   # ✅ EXISTS (to move to integrations/)
│   │   └── spotify.ts                  # ✅ EXISTS (to move to integrations/)
│   │
│   ├── 📂 data/                        # 📊 Static JSON Data (NEW)
│   │   ├── albums.json                 # ⏳ TO CREATE (from albums.ts)
│   │   ├── concerts.json               # ⏳ TO CREATE (from concerts.ts)
│   │   ├── products.json               # ⏳ TO CREATE (from products.ts)
│   │   └── announcements.json          # ⏳ TO CREATE (from announcements.ts)
│   │
│   └── 📂 styles/                      # Global styles
│       └── globals.css                 # Tailwind + custom CSS
│
├── 📂 docs/                            # 📚 Documentation (NEW)
│   ├── ARCHITECTURE.md                 # ✅ CREATED - Architecture guide
│   ├── MIGRATION.md                    # ✅ CREATED - Migration guide
│   └── FOLDER_STRUCTURE.md             # ✅ CREATED - This file
│
├── 📄 .env.local                       # Environment variables (not in git)
├── 📄 .env.example                     # ⏳ TO CREATE - Env template
├── 📄 .eslintrc.json                   # ESLint configuration
├── 📄 .gitignore                       # Git ignore rules
├── 📄 next.config.ts                   # Next.js configuration
├── 📄 next-env.d.ts                    # Next.js TypeScript declarations
├── 📄 package.json                     # Dependencies & scripts
├── 📄 package-lock.json                # Dependency lock file
├── 📄 postcss.config.mjs               # PostCSS configuration
├── 📄 README.md                        # ⏳ TO UPDATE - Project README
├── 📄 tailwind.config.ts               # Tailwind CSS configuration
└── 📄 tsconfig.json                    # TypeScript configuration
```

---

## 📊 Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | File/folder exists and is ready |
| ⏳ | To be created |
| 📦 | To be moved/refactored |
| ❌ | Deleted/removed |
| ⚠️ | Needs attention/cleanup |

---

## 🎯 Component Categories Explained

### 🎨 UI Components (`components/ui/`)
**Purpose**: Generic, reusable UI building blocks
**Characteristics**:
- No business logic
- Highly configurable via props
- No direct API calls
- Used across multiple features

**Examples**:
```typescript
<Button variant="primary" onClick={handleClick}>Click Me</Button>
<Card title="Album" image="/cover.jpg">Content</Card>
<Modal isOpen={true} onClose={handleClose}>Modal content</Modal>
```

### 🎵 Business Components (`components/business/`)
**Purpose**: Feature-specific components with business logic
**Characteristics**:
- Contains domain logic
- May call services/APIs
- Can use UI components
- Specific to one feature area

**Examples**:
```typescript
<DiscographyContainer /> // Manages album list, fetching, display
<ConcertsContainer />    // Manages concert data and display
<StoreContainer />       // E-commerce logic
```

### 📱 Layout Components (`components/layout/`)
**Purpose**: Page structure and navigation
**Characteristics**:
- Shared across pages
- Handles navigation
- Page headers/footers
- Persistent UI elements

**Examples**:
```typescript
<NavBar />  // Site navigation
<Footer />  // Site footer
```

### 🔧 Common Components (`components/common/`)
**Purpose**: Shared components that don't fit other categories
**Characteristics**:
- Used in multiple business features
- More specific than UI components
- Less generic than UI components

**Examples**:
```typescript
<SectionBanner title="Discografía" />  // Used in multiple pages
```

---

## 📂 New Folders Created

### Already Created ✅
```bash
src/types/common/
src/types/business/
src/types/integrations/
src/components/ui/Button/
src/components/ui/Card/
src/components/ui/ErrorBoundary/
src/components/business/DiscographyContainer/
src/components/business/BiographyContainer/
src/components/business/ConcertsContainer/
src/components/business/StoreContainer/
src/components/business/NewsletterContainer/
src/components/business/HomeContainer/
src/components/business/VideoGallery/
src/components/business/ContactForm/
src/components/business/AnnouncementModal/
src/components/layout/
src/components/common/
src/lib/services/
src/lib/repositories/
src/lib/integrations/spotify/
src/lib/integrations/sanity/
src/lib/utils/
src/lib/config/
src/data/
docs/
```

### Still Need to Create ⏳
```bash
src/components/ui/Modal/
src/data/*.json (all JSON files)
src/lib/utils/*.ts (utility files)
src/lib/config/*.ts (config files)
.env.example
```

---

## 🚀 Next Actions

### Immediate (Today)
1. ✅ Structure created
2. ✅ Documentation written
3. ⏳ Start moving components to new locations
4. ⏳ Update imports in moved components

### Short Term (This Week)
1. Move all components to new structure
2. Convert TypeScript data to JSON
3. Create type definition files
4. Update all imports across application

### Medium Term (Next Week)
1. Create service layer implementations
2. Create repository layer
3. Refactor integration files
4. Add unit tests

---

## 📝 File Count Summary

| Category | Existing | To Create | To Move | Total |
|----------|----------|-----------|---------|-------|
| UI Components | 0 | 8 | 0 | 8 |
| Business Components | 15 | 5 | 20 | 40 |
| Layout Components | 2 | 0 | 2 | 4 |
| Types | 1 | 9 | 0 | 10 |
| Services | 0 | 6 | 2 | 8 |
| Data Files | 5 | 4 | 5 | 9 |
| Documentation | 3 | 2 | 0 | 5 |
| **TOTAL** | **26** | **34** | **29** | **84** |

---

## 🔗 Related Documents

- [Architecture Guide](./ARCHITECTURE.md) - Detailed architecture explanation
- [Migration Guide](./MIGRATION.md) - Step-by-step migration process
- [Component Guidelines](./COMPONENTS.md) - ⏳ TO CREATE
- [Type Reference](./TYPES.md) - ⏳ TO CREATE

---

**Last Updated**: December 2024
**Version**: 3.0.0
