# Business Nexus

Business Nexus is a comprehensive platform designed to bridge the gap between entrepreneurs and investors. It provides a robust ecosystem for networking, startup management, and investment facilitation, featuring real-time communication tools and specialized dashboards for different user roles.

## 🚀 Key Features

### For Entrepreneurs
*   **Startup Management:** Tools to launch and manage startups ("Start Startup" flow).
*   **Investor Discovery:** Browse and connect with potential investors.
*   **Document Management:** Securely store and share business documents.
*   **Deal Management:** Track ongoing investment deals.

### For Investors
*   **Deal Flow:** Access a curated stream of startup opportunities.
*   **Entrepreneur Discovery:** Find and vet promising entrepreneurs.
*   **Investment Tools:** streamline the investment process.

### Shared Features
*   **Dual Dashboards:** Tailored experiences for both Entrepreneurs and Investors.
*   **Real-Time Communication:**
    *   **Chat:** Instant messaging system.
    *   **Video/Audio Calls:** Integrated calling functionality.
*   **Networking:** smart connection features to build your professional network.
*   **Meetings & Calendar:** Integrated scheduling for seamless coordination.
*   **Notifications:** Real-time updates on important activities.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** 
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Radix UI](https://www.radix-ui.com/) (Primitives)
    *   [Lucide React](https://lucide.dev/) (Icons)
*   **State Management:** React Context API
*   **Routing:** [React Router](https://reactrouter.com/)
*   **Real-time Communication:** [Socket.io Client](https://socket.io/)
*   **Utilities:**
    *   `axios` for API requests
    *   `date-fns` for date manipulation
    *   `react-hot-toast` for notifications
    *   `react-big-calendar` for event management

## 📦 Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### Steps

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd business-nexus
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory if necessary (refer to `.env.example` if available) to configure API endpoints and socket connections.

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will typically start at `http://localhost:5173`.

5.  **Build for Production**
    To create a production build:
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── api/            # API integration and services
├── components/     # Reusable UI components
├── context/        # React Context providers (Auth, Socket, etc.)
├── data/           # Mock data and static assets
├── pages/          # Application pages (Dashboard, Auth, Profile, etc.)
├── services/       # Business logic and external services
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component with routing
```

## 📄 License

[Add License Information Here]
