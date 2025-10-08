# Quick Start Guide

Get the DID Management Platform up and running in minutes!

## 🚀 Quick Setup (3 steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:5173`

That's it! 🎉

## 🧪 Testing Without a Backend API

By default, the application expects a backend API. To test the UI without a real API:

1. Open `src/lib/api.ts`
2. Replace the first line:
   ```typescript
   // Change this:
   import { phoneNumberApi } from '@/lib/api';
   
   // To this:
   import { mockPhoneNumberApi as phoneNumberApi } from '@/lib/mock-api';
   ```
3. Or update the import in `src/App.tsx`:
   ```typescript
   import { mockPhoneNumberApi as phoneNumberApi } from '@/lib/mock-api';
   ```

Now you can test all features with mock data!

## 📱 Testing the Features

### Search for Numbers
1. Click on the "Search Numbers" tab
2. Select a country (e.g., United States)
3. Optional: Add area code "415"
4. Click "Search Numbers"
5. Browse available numbers

### Purchase a Number
1. After searching, click "Select Number" on any result
2. Confirm the purchase in the dialog
3. The number will appear in "My Numbers" tab

### Configure a Number
1. Go to "My Numbers" tab
2. Click "Configure" on any number
3. Set up:
   - Friendly name
   - Voice settings (SIP/Webhook)
   - SMS settings (Webhook/Auto-reply)
4. Click "Save Configuration"

### Release a Number
1. Go to "My Numbers" tab
2. Click "Release" on any number
3. Confirm the action

## 🎨 What You'll See

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Search**: Instant results as you filter
- **Toast Notifications**: Success/error messages for all actions
- **Loading States**: Smooth loading indicators
- **Responsive**: Works on desktop, tablet, and mobile

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📚 Next Steps

1. **Connect Real API**: See `README.md` for API integration details
2. **Customize Styling**: Edit `src/index.css` for theme changes
3. **Deploy**: See `DEPLOYMENT.md` for deployment instructions
4. **Add Countries**: Edit `src/lib/countries.ts` to add more countries

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check for errors
npm run build

# Restart your IDE/editor
```

## 🎯 Key Features to Try

- ✅ Multi-criteria number search
- ✅ Real-time filtering
- ✅ Number purchase flow
- ✅ Voice/SMS configuration
- ✅ Number management dashboard
- ✅ Search owned numbers
- ✅ Release numbers
- ✅ Mobile-responsive design

## 💡 Tips

1. **Use Mock Data**: Perfect for UI testing without backend
2. **Check Browser Console**: Useful for debugging API calls
3. **Responsive Design**: Try different screen sizes
4. **Keyboard Navigation**: Most forms support tab navigation

## 📖 Documentation

- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- `src/types/phone-number.ts` - TypeScript types
- `src/lib/api.ts` - API client code

## 🆘 Need Help?

1. Check the browser console for errors
2. Review the API response format in `src/types/phone-number.ts`
3. See example mock data in `src/lib/mock-api.ts`
4. Create an issue on GitHub

Enjoy building with the DID Management Platform! 🚀

