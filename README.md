# HealthTracker Pro

![HealthTracker Pro Dashboard](https://images.pexels.com/photos/4145353/pexels-photo-4145353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

HealthTracker Pro is a comprehensive, privacy-first health monitoring application designed to empower users to take control of their well-being. It allows you to track vital health metrics like blood pressure and blood sugar, visualize trends, receive personalized insights, and manage your health data securely.

## ✨ Features

*   **Blood Pressure Tracking**: Log systolic, diastolic, and pulse readings. Categorize your readings (Normal, Elevated, High BP Stage 1/2, Hypertensive Crisis) and receive tailored recommendations.
*   **Blood Sugar Tracking**: Record glucose levels with specific test types (fasting, post-meal, random, etc.). Get estimated HbA1c, time-in-range analysis, and diabetes-friendly dietary advice.
*   **Personalized Analytics & Trends**: Visualize your health data with interactive charts and graphs. Understand your averages, highs, lows, and identify patterns over time.
*   **Intelligent Health Alerts**: Receive automated alerts for critical readings, significant trends, and recurring patterns (e.g., consistently elevated morning blood pressure, high post-meal blood sugar spikes).
*   **Actionable Recommendations**: Get personalized lifestyle and dietary recommendations based on your health data, including DASH diet principles for blood pressure and tailored advice for blood sugar management.
*   **Secure User Authentication**: Robust user authentication system with email/password sign-up, email verification, and secure password reset functionality.
*   **Cloud Synchronization**: Seamlessly sync your health data to a secure cloud backend (Supabase) for access across all your devices.
*   **Comprehensive Data Management**: Easily import data from CSV files, export your health records in various formats (PDF, CSV, Text), and manage your data with bulk deletion options.
*   **Health Education Blog**: Access an integrated blog with expert articles and health tips on various topics like nutrition, exercise, and mental well-being.
*   **Admin Dashboard**: A dedicated dashboard for administrators to manage blog content (posts, categories, tags) and monitor application usage statistics.
*   **User-Friendly Interface**: Intuitive and responsive design with light and dark mode support for a comfortable user experience.
*   **Multi-language Support**: The application supports multiple languages to cater to a diverse user base.
*   **Privacy-First Design**: Built with a strong emphasis on data privacy and security, adhering to principles of HIPAA and GDPR compliance.

## 🚀 Technologies Used

*   **Frontend**:
    *   [React](https://react.dev/) - A JavaScript library for building user interfaces.
    *   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
    *   [Vite](https://vitejs.dev/) - A fast build tool that provides a lightning-fast development experience.
*   **Styling**:
    *   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
*   **Icons**:
    *   [Lucide React](https://lucide.dev/guide/packages/lucide-react) - A beautiful and customizable icon library.
*   **Charting**:
    *   [Recharts](https://recharts.org/en-US/) - A composable charting library built with React and D3.
*   **State Management**:
    *   React Context API (for Authentication and Theme management).
*   **Backend & Database**:
    *   [Supabase](https://supabase.com/) - An open-source Firebase alternative providing PostgreSQL database, authentication, and Row Level Security (RLS).
*   **Internationalization**:
    *   [i18next](https://www.i18next.com/) - A popular internationalization framework for JavaScript.
*   **PDF Generation**:
    *   [jsPDF](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html) & [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) - Libraries for generating PDFs directly in the browser.
*   **Voice Input**:
    *   Web Speech API - For convenient voice-to-text input in forms.

## ⚙️ Setup and Installation

Follow these steps to get HealthTracker Pro up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone <repository_url>
cd healthtracker-pro
