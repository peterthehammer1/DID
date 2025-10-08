# Getting Started with DID Management Platform

Welcome to your new DID Management Platform! This guide will help you get up and running quickly.

## 📋 Table of Contents

1. [Installation](#installation)
2. [First Run](#first-run)
3. [Testing with Mock Data](#testing-with-mock-data)
4. [Connecting Real API](#connecting-real-api)
5. [Deployment](#deployment)
6. [Next Steps](#next-steps)

---

## 🚀 Installation

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- React 18
- TypeScript
- Tailwind CSS
- React Query
- All UI components
- Development tools

**Expected time**: 2-3 minutes

### Step 2: Verify Installation

Check that everything installed correctly:

```bash
npm run build
```

If successful, you'll see a `dist` folder created. This means your environment is set up correctly!

---

## 🎬 First Run

### Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.1.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Open in Browser

Navigate to **http://localhost:5173**

You should see the DID Management Platform with:
- Header with logo and title
- Two tabs: "Search Numbers" and "My Numbers"
- Search filters ready to use

---

## 🧪 Testing with Mock Data

The easiest way to test the application without setting up a backend API is to use the built-in mock data.

### Enable Mock API

**Option 1: Temporary (Recommended for testing)**

Open `src/App.tsx` and modify the import:

```typescript
// Find this line (around line 5):
import { phoneNumberApi } from '@/lib/api';

// Change it to:
import { mockPhoneNumberApi as phoneNumberApi } from '@/lib/mock-api';
```

Save the file, and the app will automatically reload with mock data!

**Option 2: Permanent**

If you want mock data as default during development, modify `src/lib/api.ts`:

```typescript
// At the end of the file, add:
export { mockPhoneNumberApi as phoneNumberApi } from './mock-api';
// Comment out: export default api;
```

### Test the Features

Now you can test everything without a real backend:

1. **Search for Numbers**
   - Select "United States" from country dropdown
   - Enter "415" in area code
   - Click "Search Numbers"
   - See 5+ results appear

2. **Purchase a Number**
   - Click "Select Number" on any result
   - Confirm the purchase
   - See success toast notification
   - Switch to "My Numbers" tab automatically

3. **Configure a Number**
   - Go to "My Numbers" tab
   - Click "Configure" on your purchased number
   - Add a friendly name: "Test Number"
   - Enable voice settings
   - Add a webhook URL: `https://example.com/webhook`
   - Click "Save Configuration"
   - See success notification

4. **Release a Number**
   - Click "Release" on any owned number
   - Confirm the action
   - Number is removed from your list

### Mock Data Details

The mock API includes:
- 10+ sample phone numbers across different countries
- Realistic API delays (300-800ms)
- In-memory state that persists during session
- All functionality works exactly like real API

---

## 🔌 Connecting Real API

Once you're ready to connect to your backend API:

### Step 1: Update API Base URL

Edit `src/lib/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'https://your-api-domain.com/api', // Update this
  headers: {
    'Content-Type': 'application/json',
    // Add authentication if needed:
    // 'Authorization': 'Bearer YOUR_API_KEY',
  },
});
```

### Step 2: Environment Variables (Optional)

For different environments, create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_KEY=your_development_api_key
```

Then update `src/lib/api.ts`:

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    ...(import.meta.env.VITE_API_KEY && {
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
    })
  },
});
```

### Step 3: Verify API Endpoints

Your backend should provide these endpoints:

```
GET    /api/numbers/search?country=US&areaCode=415
POST   /api/numbers/purchase
GET    /api/numbers/owned
PUT    /api/numbers/:id/config
DELETE /api/numbers/:id
```

See `README.md` for detailed API contract.

### Step 4: Test with Real API

1. Revert mock API changes if you made them
2. Ensure your API is running
3. Refresh the application
4. Try searching for numbers
5. Check browser console (F12) for any API errors

### Common API Issues

**CORS Errors**
- Configure your backend to allow requests from `http://localhost:5173`
- Or add a proxy in `vite.config.ts`

**Authentication Errors**
- Verify API keys are correct
- Check authorization headers

**404 Errors**
- Verify API base URL is correct
- Ensure all endpoints are implemented

---

## 🚢 Deployment

When you're ready to deploy, you have several options:

### Quick Deploy to Vercel (5 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! 🎉

See `DEPLOYMENT.md` for detailed deployment guides for:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Traditional hosting (Apache/Nginx)

---

## 📚 Next Steps

### Explore the Documentation

- **README.md** - Complete project documentation
- **FEATURES.md** - Detailed feature guide
- **PROJECT_STRUCTURE.md** - Code organization
- **DEPLOYMENT.md** - Deployment options
- **QUICKSTART.md** - Quick reference

### Customize the Application

1. **Branding**
   - Update colors in `src/index.css`
   - Change logo/title in `src/App.tsx`
   - Add your company name

2. **Add More Countries**
   - Edit `src/lib/countries.ts`
   - Add flag emoji and country code
   - Follow existing format

3. **Styling**
   - Tailwind CSS for all styling
   - Edit classes directly in components
   - Use CSS variables for theme colors

4. **Add Features**
   - All components are modular
   - TypeScript provides type safety
   - React Query handles API state
   - See PROJECT_STRUCTURE.md for architecture

### Development Workflow

```bash
# Start dev server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Learn More

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Tailwind CSS**: https://tailwindcss.com
- **React Query**: https://tanstack.com/query
- **Vite**: https://vitejs.dev

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check for errors
npx tsc --noEmit

# Restart your editor
```

### Build Fails
1. Check Node.js version: `node --version` (should be 18+)
2. Clear cache: `rm -rf node_modules dist`
3. Reinstall: `npm install`
4. Try build: `npm run build`

### API Calls Failing
1. Check browser console (F12)
2. Verify API URL is correct
3. Check CORS settings on backend
4. Try with mock API to isolate issue

---

## ✅ Quick Checklist

Before you start developing:

- [ ] Dependencies installed (`npm install`)
- [ ] Dev server runs (`npm run dev`)
- [ ] Application opens in browser
- [ ] Mock API working (optional)
- [ ] Can search for numbers
- [ ] Can purchase numbers
- [ ] Can configure numbers
- [ ] Read through documentation

Before you deploy:

- [ ] Real API connected (or mock API disabled)
- [ ] All features tested
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Environment variables set
- [ ] Code pushed to GitHub
- [ ] Deployment platform chosen

---

## 🎉 You're Ready!

You now have a fully functional DID Management Platform! 

**What you've got:**
- ✅ Modern, responsive UI
- ✅ Complete search functionality
- ✅ Number purchase flow
- ✅ Configuration management
- ✅ Dashboard with filtering
- ✅ Toast notifications
- ✅ Error handling
- ✅ Type safety
- ✅ Mock API for testing
- ✅ Production-ready code

**Start building your telecommunications platform today!** 🚀

---

## 📞 Support

If you run into issues:

1. Check the documentation files
2. Review browser console for errors
3. Verify API connectivity
4. Check the troubleshooting section above
5. Review the project structure

Happy coding! 💻

