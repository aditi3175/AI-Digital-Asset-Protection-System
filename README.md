# 🛡️ AI Digital Asset Protection System

A sleek, dark-themed web application that scans and analyzes digital assets for AI-generated content detection. Upload images, generate unique fingerprints, get similarity scores, and receive AI-powered explanations — all in a clean, modern dashboard.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-API-4285F4?logo=google&logoColor=white)

---

## ✨ Features

- **Image Upload & Preview** — Drag or click to upload PNG, JPG, or WEBP images with instant preview
- **AI Fingerprinting** — Generates unique visual fingerprints for each uploaded asset
- **Similarity Detection** — Scores images on a 60–100% similarity scale with High/Medium/Low classification
- **Gemini AI Explanation** — Integrates Google Gemini API to generate professional, context-aware explanations of detection results
- **Analysis Dashboard** — View all analyzed assets with fingerprints, scores, types, and AI insights in one place
- **Persistent Storage** — Results are saved to localStorage and persist across browser sessions
- **Client-Side Routing** — React Router ensures URLs persist on page reload

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, JSX |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 3 |
| **Routing** | React Router DOM |
| **Icons** | Lucide React |
| **AI** | Google Gemini API (gemini-2.0-flash) |
| **Storage** | Browser localStorage |

## 🎨 Design

- **Dark theme** with black/charcoal backgrounds and tea green accents
- Glassmorphic navigation bar with backdrop blur
- Clean white-on-dark card layouts with gradient borders
- Smooth hover animations and micro-interactions
- Color-coded similarity indicators (🔴 High · 🟡 Medium · 🟢 Low)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Google Gemini API key](https://aistudio.google.com/apikey) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/aditi3175/AI-Digital-Asset-Protection-System.git
cd AI-Digital-Asset-Protection-System

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AnalyzePanel.jsx    # Image analysis + Gemini AI explanation
│   ├── Header.jsx          # Navigation bar with active route highlighting
│   ├── ImageUpload.jsx     # File upload with drag zone and preview
│   └── ResultCard.jsx      # Dashboard card for each analyzed asset
├── pages/
│   ├── Landing.jsx         # Hero landing page
│   ├── Home.jsx            # Upload + Analyze layout
│   └── Dashboard.jsx       # Results grid with asset cards
├── services/
│   └── gemini.js           # Google Gemini API integration
├── App.jsx                 # Router setup and state management
├── main.jsx                # Entry point
└── styles.css              # Global styles + Tailwind imports
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key |

> **Note:** The `.env` file is gitignored. Never commit API keys. Use `.env.example` as a reference.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
