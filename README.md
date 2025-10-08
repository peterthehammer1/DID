# DID Management Platform

A modern web application for selecting, purchasing, and configuring telephone numbers (DIDs - Direct Inward Dialing). Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Advanced Search** - Search phone numbers by country, area code, city, pattern, and type
- 📱 **Number Management** - Purchase, configure, and release phone numbers
- ⚙️ **Configuration** - Set up voice forwarding (SIP/Webhook) and SMS settings
- 📊 **Dashboard** - View and manage all your active numbers in one place
- 🎨 **Modern UI** - Clean, responsive interface built with shadcn/ui components
- ⚡ **Real-time Updates** - Instant search results and configuration updates

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A backend API server running at `/api/numbers/*` endpoints

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DID
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Integration

The application expects the following REST API endpoints:

### Search Numbers
```
GET /api/numbers/search?country=US&areaCode=415&city=San+Francisco&pattern=*555*&numberType=local
```

### Purchase Number
```
POST /api/numbers/purchase
Body: { numberId: "string" }
```

### Get Owned Numbers
```
GET /api/numbers/owned
```

### Update Configuration
```
PUT /api/numbers/:id/config
Body: {
  friendlyName: "string",
  voiceEnabled: boolean,
  smsEnabled: boolean,
  voiceConfig: { ... },
  smsConfig: { ... }
}
```

### Release Number
```
DELETE /api/numbers/:id
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── NumberSearchFilters.tsx
│   ├── PhoneNumberCard.tsx
│   ├── NumberSearchResults.tsx
│   ├── NumberConfigDialog.tsx
│   └── OwnedNumbersDashboard.tsx
├── lib/                # Utilities and API client
│   ├── api.ts          # API client functions
│   ├── utils.ts        # Utility functions
│   └── countries.ts    # Country data
├── types/              # TypeScript type definitions
│   └── phone-number.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to your hosting provider.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Features Overview

### Number Search
- Multi-criteria search with real-time results
- Filter by country, area code, city, number pattern, and type
- Visual indicators for number capabilities (Voice, SMS, MMS)

### Number Configuration
- Voice settings: SIP forwarding, webhook URLs, voicemail
- SMS settings: webhook URLs, auto-reply messages
- Enable/disable capabilities independently
- Friendly name assignment

### Dashboard
- View all owned numbers at a glance
- Search and filter your numbers
- Quick access to configuration
- One-click number release with confirmation

## Customization

### Styling
The application uses CSS variables for theming. Edit `src/index.css` to customize colors:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --background: 0 0% 100%;
  /* ... more variables */
}
```

### Adding Countries
Edit `src/lib/countries.ts` to add or modify supported countries.

## License

MIT

## Support

For issues and feature requests, please create an issue in the repository.

