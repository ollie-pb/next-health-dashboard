# Next Health Personal Health Dashboard

> A fully interactive, high-fidelity prototype for comprehensive health data visualization

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)

## 🎯 Project Overview

A clickable prototype demonstrating Next Health's vision for transforming complex health data into an intuitive, delightful experience. Built for board presentation, this prototype showcases how customers can effortlessly navigate their comprehensive health metrics on any device.

### ✨ Key Features

- **📱 Mobile-First Design** - Optimized for 375px baseline with responsive scaling
- **🎚️ Three-Level Architecture** - Dashboard → Components → Biomarkers navigation
- **📊 12 Health Scores** - Complete suite of health metrics
- **📈 Interactive Charts** - Time series visualization with reference ranges
- **🎓 Educational Content** - Tooltips explaining biomarker significance
- **🎨 Premium Aesthetics** - Medical-grade design suitable for $200+/month service
- **⚡ Real-time Interactions** - Smooth animations and micro-interactions

## 🚀 Live Demo

Navigate through the complete user journey:
1. **Dashboard** → View all 12 health scores
2. **Nutrition Score** → Explore 5 health components  
3. **Glycemic Control** → Deep dive into biomarkers
4. **Interactive Charts** → Toggle between list and graph views
5. **Empty States** → See graceful no-data handling (Brain Health)

## 🛠 Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Build Tool**: Vite for fast development and optimization
- **Charts**: Custom SVG-based visualizations
- **Icons**: Emoji-based iconography for universal appeal

## 📱 Design System

### Color Palette
```css
Primary Navy:    #1B3A5F  /* Navigation, headers */
Primary Blue:    #4A90E2  /* Interactive elements */
Status Optimal:  #28A745  /* 90-100 range */
Status Good:     #6CBF84  /* 70-89 range */
Status Attention: #FFC107 /* 50-69 range */
Status Concern:  #FF6B6B  /* 0-49 range */
```

### Typography
- **Display**: Helvetica Neue (headers)
- **Body**: Inter (content)
- **Data**: Monospace (values)

### Responsive Breakpoints
- **Mobile**: 375px (baseline)
- **Tablet**: 768px
- **Desktop**: 1024px
- **Wide**: 1440px

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd health-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Component Architecture

### Core Components
- **`Dashboard`** - Main health scores grid
- **`ScoreCard`** - Individual health score display
- **`ComponentsView`** - Second-level component navigation
- **`BiomarkersView`** - Detailed biomarker analysis
- **`LineChart`** - Time series visualization

### UI Components
- **`CircularProgress`** - Animated progress rings
- **`HorizontalProgress`** - Component progress bars
- **`EmptyState`** - Beautiful no-data placeholders
- **`InfoTooltip`** - Educational content overlays
- **`LoadingSkeleton`** - Shimmer loading states

## 📊 Sample Data

The prototype includes realistic health data demonstrating:

### Nutrition Score (Complete Data)
- **5 Components**: Whole Foods, Timing, Micronutrients, Glycemic Control, Metabolic Health
- **9 Biomarkers**: Glucose, HbA1c, Triglycerides, Vitamin D, B12, Insulin, etc.
- **Historical Data**: 3-6 months of trend data

### Data States
- **Complete Data**: Nutrition (85/100)
- **No Data**: Brain Health (empty state)
- **Partial Data**: Various completion percentages

## 🎯 User Experience Highlights

### Target User
- **Age**: 35-55 years old
- **Income**: $150,000+ household
- **Behavior**: Health-conscious professional
- **Usage**: Morning coffee smartphone checking

### Key Interactions
- **Tap to Navigate**: Intuitive drill-down through data levels
- **Educational Tooltips**: Hover for biomarker explanations
- **Visual Feedback**: Hover states and smooth transitions
- **Data Transparency**: Clear completion indicators

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## 🔮 Future Enhancements

### Phase 4 Roadmap
- **Guided Tours** - Interactive onboarding
- **Advanced Charts** - More visualization types
- **Real Data Integration** - API connectivity
- **User Preferences** - Customizable dashboard
- **Social Features** - Progress sharing

## 🎨 Design Philosophy

> **"Make it feel like a premium health companion that simplifies complexity while respecting the seriousness of health data."**

### Principles
1. **Mobile-First** - Thumb-friendly, 375px optimized
2. **Progressive Disclosure** - Details on demand
3. **Data Transparency** - Never hide data gaps
4. **Educational** - Empower through understanding
5. **Premium Feel** - Medical-grade aesthetics

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

This is a prototype for board presentation. For questions or feedback, please contact the development team.

---

**Built with ❤️ for Next Health**  
*Transforming health data into actionable insights*