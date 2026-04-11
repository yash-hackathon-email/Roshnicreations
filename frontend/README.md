# Roshni Creations - Fine Jewellery E-Commerce Masterpiece 💎

A luxurious, production-ready e-commerce platform engineered specifically for modern jewelers. **Roshni Creations** bridges the timeless art of handcrafted jewelry with cutting-edge web technologies, featuring seamless authentication, live metal pricing, Razorpay checkout, and highly immersive Interactive 3D Model Galleries.

## ✨ Core Highlights & Features

*   **📱 Native Mobile-First Architecture:** Flawless bottom-dock navigation explicitly designed for a pure, native app feel on mobile devices, with precise responsive routing.
*   **🌐 Instagram-Style Reels Engine:** Fully native `snap-mandatory` vertical video scrolling feed for products, simulating real-life TikTok/Instagram interactivity. Utilizing native Intersection Observers for surgical auto-play logic.
*   **💳 Live Razorpay Payment Integration:** Complete API handshake and UI implementation for securely accepting live localized payments through Razorpay, dynamically synchronized with Firestore.
*   **📦 Real-Time Firestore Tracking:** Robust cloud architecture! Order payloads push directly into Firebase, immediately rendering Live Tracking updates (Placed → Packed → Dispatched) strictly isolated per specific user.
*   **💍 Google Interactive 3D Previews:** Fully integrated `@google/model-viewer`. Let your users drag, rotate, and pinch-zoom `.glb` models of 24K jewelry in breathtaking 360-degree environments directly inside their web browser.
*   **📈 Live Wall Street Style Metal Ticker:** Infinite CSS Marquee crawling across the global application ceiling presenting geographically accurate Live Gold 24K, 22K, and Silver metrics per 10 grams, driven by native drift algorithms.
*   **🔒 Secure Asymmetric Navigation:** Segregated routing logic determining Admin-level dashboard tracking versus Customer-level profile details.

## 🛠 Tech Stack

*   **Frontend Framework:** React 18, Vite
*   **State Management:** Context API (`AuthContext`, `CartContext`)
*   **Styling Engine:** Tailwind CSS v4 (Custom Ivory & Champagne Gold Design System)
*   **Animations & Physics:** Framer Motion (Transitions), Native CSS Keyframes
*   **Database & Auth:** Firebase / Cloud Firestore (Google)
*   **Payment Gateway:** Razorpay Global API
*   **Web-GL Engine:** Google Model Viewer Custom Web Component
*   **Icons:** Lucide-React & React-Icons

## 🚀 Getting Started

To launch the development engine locally and inspect the code architecture:

1.  **Clone down the infrastructure:** Ensure you're pulling from `main` or active SSH branches.
2.  **Install exactly required dependencies:**
    ```bash
    npm install
    # Wait for vite, react, tailwind, framer-motion, lucide-react integration...
    ```
3.  **Boot the Vite Hot-Reloading server:**
    ```bash
    npm run dev
    ```
4.  Navigate securely to Native Localhost (`http://localhost:5173/`).

## 🗺 Application Ecosystem & Routing

*   `/` — Landing Page (Immersive Video Hero + 3D Interactive Viewer + Scratch off)
*   `/products` — Advanced Listing Catalog & Sorting Features
*   `/reels` — 100% Native Vertical Snap MP4 Jewelry Scroller
*   `/cart` & `/checkout` — Razorpay-protected seamless purchase pipeline 
*   `/admin` — Protected Tracking Portal (Chronological Order Maps + Profile Logs)

## 🔑 Environment Variables & Security Note

To attach this frontend to your explicit endpoints, ensure a valid `.env` config with Firebase initialization properties. Never expose raw API secrets in version control. The repository relies natively on `assets/products.json` and `.glb` files configured inside `/public/` for heavy rendering.

---
*Built intricately with perfection by **Antigravity**. Designed exclusively for authentic Fine Jewellery representation. ✨💍*
