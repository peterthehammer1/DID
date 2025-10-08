# Project Structure

Complete overview of the DID Management Platform file structure and architecture.

## 📁 Directory Structure

```
DID/
├── public/                      # Static assets
│   └── vite.svg                # Vite logo
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── badge.tsx      # Badge component
│   │   │   ├── button.tsx     # Button component
│   │   │   ├── card.tsx       # Card component
│   │   │   ├── dialog.tsx     # Dialog/Modal component
│   │   │   ├── input.tsx      # Input field component
│   │   │   ├── label.tsx      # Label component
│   │   │   ├── select.tsx     # Select dropdown component
│   │   │   ├── switch.tsx     # Toggle switch component
│   │   │   └── tabs.tsx       # Tabs component
│   │   ├── NumberConfigDialog.tsx        # Number configuration modal
│   │   ├── NumberSearchFilters.tsx       # Search filters form
│   │   ├── NumberSearchResults.tsx       # Search results display
│   │   ├── OwnedNumbersDashboard.tsx     # Dashboard for owned numbers
│   │   └── PhoneNumberCard.tsx           # Individual number card
│   ├── lib/                   # Utilities and helpers
│   │   ├── api.ts            # API client (Axios)
│   │   ├── countries.ts      # Country data
│   │   ├── mock-api.ts       # Mock API for testing
│   │   └── utils.ts          # Utility functions
│   ├── types/                # TypeScript type definitions
│   │   └── phone-number.ts   # Phone number types
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles & Tailwind
├── .eslintrc.cjs             # ESLint configuration
├── .gitignore                # Git ignore file
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # TypeScript config for Node
├── vite.config.ts            # Vite configuration
├── DEPLOYMENT.md             # Deployment guide
├── QUICKSTART.md             # Quick start guide
├── PROJECT_STRUCTURE.md      # This file
└── README.md                 # Main documentation
```

## 🧩 Component Architecture

### Core Application Flow

```
App.tsx
├── QueryClientProvider (React Query)
├── Toaster (Sonner notifications)
├── Header
└── Tabs
    ├── Search Tab
    │   ├── NumberSearchFilters
    │   └── NumberSearchResults
    │       └── PhoneNumberCard (multiple)
    └── My Numbers Tab
        └── OwnedNumbersDashboard
            └── NumberConfigDialog (modal)
```

## 📦 Key Files Explained

### `/src/App.tsx`
Main application component containing:
- React Query setup
- Tab navigation (Search / My Numbers)
- State management for dialogs and selections
- Mutations for purchase, update, release
- Toast notifications

### `/src/types/phone-number.ts`
TypeScript interfaces:
- `PhoneNumber` - Available number structure
- `OwnedPhoneNumber` - Purchased number structure
- `SearchFilters` - Search criteria
- `VoiceConfig` - Voice settings
- `SmsConfig` - SMS settings
- `Country` - Country data structure

### `/src/lib/api.ts`
API client with endpoints:
- `search()` - Search available numbers
- `purchase()` - Purchase a number
- `getOwned()` - Get owned numbers
- `updateConfig()` - Update number configuration
- `release()` - Release a number

### `/src/lib/mock-api.ts`
Mock implementation for testing without backend:
- 10+ sample phone numbers
- Simulated API delays
- In-memory state management
- Same interface as real API

### `/src/components/NumberSearchFilters.tsx`
Search interface with filters:
- Country dropdown with flags
- Area code input
- City input
- Number pattern matching
- Number type selector
- Search and reset buttons

### `/src/components/PhoneNumberCard.tsx`
Individual number display card showing:
- Formatted phone number
- Location information
- Number type badge
- Capabilities (Voice/SMS/MMS)
- Monthly price
- Select button

### `/src/components/NumberSearchResults.tsx`
Results container:
- Loading state
- Empty state
- Grid of PhoneNumberCard components
- Results count

### `/src/components/NumberConfigDialog.tsx`
Configuration modal with:
- Friendly name input
- Voice settings toggle
  - SIP forwarding
  - Webhook URL
  - Voicemail toggle
- SMS settings toggle
  - Webhook URL
  - Auto-reply settings
- Save/Cancel buttons

### `/src/components/OwnedNumbersDashboard.tsx`
Dashboard displaying:
- Search bar for filtering
- List of owned numbers
- Configuration status badges
- Configure button (opens modal)
- Release button (with confirmation)

## 🎨 UI Components (`/src/components/ui/`)

Built using shadcn/ui (Radix UI primitives):

| Component | Purpose |
|-----------|---------|
| `button.tsx` | Buttons with variants (primary, destructive, outline, ghost) |
| `input.tsx` | Text input fields |
| `label.tsx` | Form labels |
| `select.tsx` | Dropdown selections |
| `dialog.tsx` | Modal dialogs |
| `switch.tsx` | Toggle switches |
| `card.tsx` | Content containers |
| `badge.tsx` | Status badges |
| `tabs.tsx` | Tab navigation |

## 🔧 Configuration Files

### `tailwind.config.js`
- Custom color scheme
- Container settings
- Animation utilities
- Theme extension

### `vite.config.ts`
- React plugin
- Path aliases (@/ for src/)
- Build optimization

### `tsconfig.json`
- Strict TypeScript
- ES2020 target
- Path mapping
- JSX configuration

### `package.json`
Key dependencies:
- React 18
- TypeScript
- Tailwind CSS
- Radix UI components
- React Query
- React Hook Form
- Axios
- Sonner (toasts)
- Lucide React (icons)

## 🔄 Data Flow

### Search Flow
1. User enters filters in `NumberSearchFilters`
2. `App.tsx` receives filters
3. React Query triggers `phoneNumberApi.search()`
4. Results displayed in `NumberSearchResults`
5. Each result rendered as `PhoneNumberCard`

### Purchase Flow
1. User clicks "Select Number" on `PhoneNumberCard`
2. Confirmation dialog appears
3. `purchaseMutation` executes
4. API call to `phoneNumberApi.purchase()`
5. Success toast notification
6. Owned numbers list refreshed
7. Tab switches to "My Numbers"

### Configuration Flow
1. User clicks "Configure" on owned number
2. `NumberConfigDialog` opens with current settings
3. User modifies settings
4. Form submission triggers `updateConfigMutation`
5. API call to `phoneNumberApi.updateConfig()`
6. Success toast notification
7. Dashboard refreshes with new configuration

### Release Flow
1. User clicks "Release" on owned number
2. Confirmation dialog appears
3. `releaseMutation` executes
4. API call to `phoneNumberApi.release()`
5. Success toast notification
6. Number removed from dashboard

## 🎯 State Management

### React Query (TanStack Query)
Manages server state:
- Caching
- Automatic refetching
- Optimistic updates
- Loading/error states

### React Hook Form
Manages form state:
- Validation
- Field registration
- Form submission
- Error handling

### Local State (useState)
Manages UI state:
- Dialog open/closed
- Selected number
- Active tab
- Search filters

## 🚀 Performance Optimizations

1. **React Query Caching**: Reduces unnecessary API calls
2. **Lazy Queries**: Search only executes when triggered
3. **Optimistic Updates**: Immediate UI feedback
4. **Code Splitting**: Vite handles automatic splitting
5. **Tree Shaking**: Unused code removed in production
6. **CSS Purging**: Tailwind removes unused styles

## 🔐 Type Safety

Fully typed with TypeScript:
- All API responses typed
- Component props typed
- Form data typed
- Event handlers typed
- Utility functions typed

## 📱 Responsive Design

Mobile-first approach:
- Grid system: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Flexible layouts with Flexbox
- Responsive text sizing
- Touch-friendly buttons
- Collapsible navigation

## 🎨 Theming

CSS variables for easy customization:
- Colors: `--primary`, `--background`, etc.
- Spacing: consistent with Tailwind
- Border radius: `--radius`
- Dark mode support included

## 🧪 Testing Approach

For testing without backend:
1. Use `mock-api.ts`
2. Swap import in `App.tsx`
3. All features work with mock data
4. Simulated API delays for realistic UX

## 📦 Build Output

Production build creates:
- `dist/index.html` - Entry point
- `dist/assets/*.js` - JavaScript bundles
- `dist/assets/*.css` - Styles
- Source maps for debugging
- Optimized and minified

## 🔄 Development Workflow

1. Edit files in `src/`
2. Vite HMR updates instantly
3. TypeScript checks in real-time
4. ESLint reports issues
5. Save and test in browser

## 📚 Adding New Features

### New Component
1. Create in `src/components/`
2. Import required UI components
3. Add TypeScript types
4. Export component
5. Import in `App.tsx`

### New API Endpoint
1. Add method to `src/lib/api.ts`
2. Add corresponding types
3. Create React Query hook in component
4. Handle loading/error states

### New Country
1. Add to `src/lib/countries.ts`
2. Include flag emoji
3. Follow existing format

## 🎓 Learning Resources

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Radix UI: https://www.radix-ui.com
- React Query: https://tanstack.com/query
- React Hook Form: https://react-hook-form.com
- Vite: https://vitejs.dev

---

This structure provides a solid foundation for a scalable, maintainable telecommunications platform. Each component is modular and can be extended independently.

