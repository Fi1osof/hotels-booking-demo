# Hotel Booking Dashboard

A feature-rich hotel booking dashboard built with Next.js, TypeScript, and React. This project demonstrates modern frontend architecture, best practices, and production-ready tooling.

**Live Demo:** [https://fi1osof.github.io/hotels-booking-demo/](https://fi1osof.github.io/hotels-booking-demo/)  
**Storybook:** [https://fi1osof.github.io/hotels-booking-demo/storybook/](https://fi1osof.github.io/hotels-booking-demo/storybook/)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [CI/CD](#cicd)
- [Design Decisions](#design-decisions)

---

## Features

### Core Functionality

- **Multi-criteria filtering**: Search by name/city, price range, amenities, minimum rating, date availability
- **Advanced sorting**: Sort by price, rating, or name (ascending/descending)
- **Pagination**: 10 items per page with navigation controls
- **Statistics modal**: Aggregated analytics using `transformData` utility
- **Debounced search**: 300ms debounce to optimize performance

### UI/UX

- Responsive grid layout
- Loading states during search debounce
- Empty state when no results match filters
- Active filter count badge
- "Clear all filters" functionality

---

## Tech Stack

| Category             | Technology                                     | Purpose                                    |
| -------------------- | ---------------------------------------------- | ------------------------------------------ |
| **Framework**        | Next.js 16 (App Router)                        | React framework with static export         |
| **Language**         | TypeScript                                     | Type safety and developer experience       |
| **Styling**          | styled-components                              | CSS-in-JS with theming support             |
| **State Management** | React hooks (useReducer, useMemo, useCallback) | Local state with performance optimization  |
| **Testing**          | Vitest + React Testing Library                 | Unit and integration testing               |
| **Documentation**    | Storybook                                      | Component documentation and visual testing |
| **Linting**          | ESLint 9                                       | Code quality and consistency               |
| **Formatting**       | Prettier                                       | Code formatting                            |
| **Git Hooks**        | Husky + lint-staged                            | Pre-commit and pre-push automation         |
| **CI/CD**            | GitHub Actions                                 | Automated build and deployment             |
| **Hosting**          | GitHub Pages                                   | Static site hosting                        |

---

## Architecture

### Custom Hooks

#### `useHotelFilters`

Central state management hook using `useReducer` pattern:

- Manages all filter states (search, price range, amenities, rating, dates)
- Handles sorting configuration
- Computes filtered and paginated results via `useMemo`
- Returns memoized action dispatchers

#### `useDebounce`

Generic debounce hook for optimizing user input:

- Delays value updates by specified milliseconds
- Prevents excessive re-renders during typing

### Utility Functions

#### `transformData`

A powerful data transformation utility implementing:

- **Grouping**: Single key or composite keys (e.g., `['category', 'location.city']`)
- **Nested paths**: Support for dot notation (e.g., `'location.city'`)
- **Aggregations**: `sum`, `avg`, `min`, `max`, `count`
- **Sorting**: By aggregated values (ascending/descending)
- **Pre-filtering**: Optional filter function before grouping
- **O(n) complexity**: Efficient single-pass grouping algorithm

### Component Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with ThemeProvider
│   └── page.tsx            # Home page
├── components/
│   ├── HotelBookingDashboard/  # Main dashboard component
│   ├── HotelCard/              # Individual hotel card
│   └── Statistics/             # Statistics modal content
├── ui-kit/                 # Reusable UI components
│   ├── Button/
│   ├── Input/
│   ├── Select/
│   ├── Checkbox/
│   ├── RangeSlider/
│   ├── DatePicker/
│   ├── Rating/
│   ├── Badge/
│   ├── Popover/
│   └── Modal/
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── theme/                  # styled-components theme
├── types/                  # TypeScript type definitions
└── data/                   # Static data (hotels)
```

### UI Kit Philosophy

Each UI component follows a consistent pattern:

- `index.tsx` - Component logic and JSX
- `styles.ts` - styled-components definitions
- `index.stories.tsx` - Storybook documentation (where applicable)

Components are designed to be:

- **Reusable**: Generic props interface
- **Accessible**: ARIA labels, keyboard navigation
- **Themeable**: All values from theme tokens

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/Fi1osof/hotels-booking-demo.git
cd hotels-booking-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Script                    | Description                          |
| ------------------------- | ------------------------------------ |
| `npm run dev`             | Start development server             |
| `npm run build`           | Build for production (static export) |
| `npm run start`           | Start production server              |
| `npm run test`            | Run tests in watch mode              |
| `npm run test -- --run`   | Run tests once                       |
| `npm run lint`            | Run ESLint                           |
| `npm run lint:fix`        | Run ESLint with auto-fix             |
| `npm run format`          | Format code with Prettier            |
| `npm run format:check`    | Check code formatting                |
| `npm run typecheck`       | Run TypeScript type checking         |
| `npm run typecheck:watch` | Run TypeScript in watch mode         |
| `npm run storybook`       | Start Storybook dev server           |
| `npm run build-storybook` | Build Storybook for production       |

---

## Testing

### Test Framework

- **Vitest**: Fast, Vite-native test runner
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom matchers

### Test Coverage

#### `useHotelFilters.test.ts`

- Returns all hotels initially
- Filters by search query
- Filters by price range
- Filters by minimum rating
- Resets all filters

#### `transformData.test.ts`

- Groups by single key
- Calculates sum aggregation
- Calculates avg aggregation
- Calculates min/max aggregation
- Handles nested key paths
- Supports composite grouping keys
- Sorts by aggregated values
- Applies pre-filter function
- Throws on invalid input

### Running Tests

```bash
# Watch mode
npm run test

# Single run
npm run test -- --run

# With UI
npm run test:ui
```

---

## Code Quality

### ESLint Configuration

ESLint 9 with flat config (`eslint.config.js`):

- TypeScript support via `@typescript-eslint`
- React and React Hooks plugins
- Key rules:
  - `react/jsx-no-bind: error` - Prevents inline functions in JSX
  - `react/function-component-definition` - Enforces function declarations
  - `react-hooks/rules-of-hooks` - Validates hooks usage
  - `react-hooks/exhaustive-deps` - Validates dependency arrays

### Prettier Configuration

Consistent code formatting:

- Single quotes
- Semicolons
- 100 character line width
- 2 space indentation

### Git Hooks (Husky)

#### Pre-commit

Runs `lint-staged`:

- ESLint with auto-fix on `*.{ts,tsx}`
- Prettier on `*.{ts,tsx,json,md}`

#### Pre-push

- TypeScript type checking (`npm run typecheck`)
- Test suite (`npm run test -- --run`)

---

## CI/CD

### GitHub Actions Workflow

`.github/workflows/deploy.yml`:

1. **Trigger**: Push to `master` branch
2. **Build Job**:
   - Checkout code
   - Setup Node.js 20 with npm cache
   - Install dependencies (`npm ci`)
   - Build Next.js static export (`npm run build`)
   - Build Storybook (`npm run build-storybook -o out/storybook`)
   - Upload `out/` directory as artifact
3. **Deploy Job**:
   - Deploy to GitHub Pages

### Environment Variables

| Variable    | Purpose                                               |
| ----------- | ----------------------------------------------------- |
| `BASE_PATH` | Sets Next.js `basePath` for GitHub Pages subdirectory |

---

## Design Decisions

### Why Next.js with Static Export?

- Modern React framework with excellent DX
- Static export (`output: 'export'`) for GitHub Pages compatibility
- Built-in optimizations (code splitting, prefetching)

### Why styled-components?

- CSS-in-JS for component-scoped styles
- Theme support for consistent design tokens
- SSR support with Next.js compiler integration

### Why useReducer over useState?

- Complex state with multiple related values
- Predictable state transitions via actions
- Easier to test and debug

### Why Vitest over Jest?

- Native ESM support
- Faster execution
- Compatible with Vite ecosystem
- Same API as Jest

### Why No External UI Library?

- Per task requirements: "No external UI libraries (except React)"
- Demonstrates ability to build accessible, reusable components from scratch

---

## Performance Optimizations

Special attention was paid to rendering performance optimization:

1. **useMemo for JSX lists**: Hotel cards list is wrapped in `useMemo` to prevent re-creating JSX array on parent re-render. Without this, React treats each element as "new" and re-renders all cards.
2. **React.memo for Filters**: Filters component is wrapped in `React.memo` to skip re-rendering when props haven't changed.
3. **useCallback for handlers**: All event handlers use `useCallback` to maintain stable references.
4. **Debouncing**: 300ms delay on search input to reduce filter recalculations.
5. **Pagination**: 10 items per page to limit DOM nodes.
6. **Actions in useMemo**: All action dispatchers grouped in single `useMemo` block.
7. **Derived state**: `isSearching` computed from comparison, not stored in state.

---

## Accessibility

- Semantic HTML elements (`header`, `section`, `button`, etc.)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in Modal component
- Color contrast following WCAG guidelines

---

## License

ISC

---

## Author

Nikolai Lanets
