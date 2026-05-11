# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pocket Heist is a Next.js 16 web application demonstrating modern React development patterns. It's a gamified task management system with authentication flows and heist (mission) management.

## Essential Commands

### Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run start        # Run production server
```

### Testing
```bash
npm test                           # Run all tests in watch mode
npm test -- --run                  # Run tests once without watch
npm test -- tests/components/Navbar.test.tsx  # Run specific test file
```

### Code Quality
```bash
npm run lint         # Run ESLint
```

## Architecture

### Route Organization

This project uses **Next.js App Router route groups** to organize pages by authentication state without affecting URLs:

- **`app/(public)/`** - Unauthenticated pages wrapped in `.public` layout
  - Routes: `/`, `/login`, `/signup`, `/preview`
  - Layout: `app/(public)/layout.tsx` applies `.public` class to `<main>`

- **`app/(dashboard)/`** - Authenticated pages with navigation
  - Routes: `/heists`, `/heists/create`, `/heists/[id]`
  - Layout: `app/(dashboard)/layout.tsx` renders `<Navbar>` component

The parentheses in directory names create logical groupings without adding URL segments.

### Component Structure

Components follow this pattern:
```
components/
└── ComponentName/
    ├── ComponentName.tsx        # Main component
    ├── ComponentName.module.css # Scoped styles (CSS Modules)
    └── index.ts                 # Barrel export
```

Import components using barrel exports: `import Navbar from "@/components/Navbar"`

### Styling System

**Tailwind CSS 4** is the primary styling approach, with CSS Modules for component-specific styles.

**Theme colors** defined in `app/globals.css`:
- `primary` (#C27AFF) - Purple
- `secondary` (#FB64B6) - Pink
- `dark` (#030712) - Background
- `light` (#0A101D) - Surface
- `lighter` (#101828) - Elevated surface
- `success` (#05DF72) - Green
- `error` (#FF6467) - Red
- `heading` (white) - Headings
- `body` (#99A1AF) - Body text

**Utility classes** in `globals.css`:
- `.page-content` - Main content container with max-width
- `.center-content` - Vertically centered full-height layout
- `.form-title` - Centered form headings
- `.public` - Applied to public route group layout

### Path Aliasing

TypeScript and Vitest are configured with `@/*` path alias mapping to project root:
```typescript
import Navbar from "@/components/Navbar"
import "@/app/globals.css"
```

### Testing Setup

- **Framework**: Vitest with jsdom environment
- **Utilities**: React Testing Library with jest-dom matchers
- **Configuration**: `vitest.config.mts` with global test utilities enabled
- **Setup**: `vitest.setup.ts` imports `@testing-library/jest-dom`

Tests can use `describe`, `it`, `expect` without imports due to `globals: true` setting.

## Key Files

- `app/layout.tsx` - Root HTML structure and metadata
- `app/globals.css` - Theme variables, global styles, utility classes
- `app/(public)/layout.tsx` - Public routes wrapper
- `app/(dashboard)/layout.tsx` - Dashboard routes with Navbar
- `vitest.config.mts` - Test runner configuration
- `tsconfig.json` - Path aliases and compiler options
