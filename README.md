# ⚔️ Clash of Minds
### Turn Your Knowledge into Power

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20Pro-8E75B2)

**Clash of Minds** is an AI-powered RPG that transforms your study notes, PDFs, and textbooks into epic boss battles. By combining the reasoning power of **Google Gemini 2.0** with real-time asset generation, we turn the mundane act of studying into an engaging, high-stakes adventure.

---

## 🌟 Key Features

### 🎮 Dynamic RPG Generation
Upload any document or paste a topic, and our AI Director constructs a unique dungeon just for you.
- **Context-Aware Questions**: Every enemy attack is a quiz question derived directly from your material.
- **Visual Storytelling**: Bosses and environments are generated on the fly to match the theme of your study topic.

### ⚔️ Multiplayer Raids (Co-op)
Don't study alone! Team up with a friend in **Raid Mode**.
- **Shared Boss HP**: Work together to take down massive Raid Bosses.
- **Real-Time Sync**: Instant state synchronization for a seamless cross-device experience.
- **Support Roles**: Heal your partner or buff their attacks by answering correctly.

### 📜 The Grimoire (Smart Review)
Your personal spellbook of knowledge.
- **Automatic Tracking**: Every missed question is recorded as a "Knowledge Shard".
- **Spaced Repetition**: Review your shards to permanently unlock them and clear your debt.
- **Scholar Reports**: Get detailed analytics on your weak points and learning progress.

### 🎯 Daily Quests & Streaks
Build a learning habit that sticks.
- **Daily Challenges**: Quick-fire questions to keep your streak alive.
- **Progression**: Earn XP, level up your profile, and unlock new avatar customizations.

### 🎨 Live Green Screen Tech
Experience a visually immersive world.
- **Real-Time Compositing**: We generate assets with green backgrounds and use client-side Canvas processing to seamlessly blend characters into dynamic environments.
- **Custom Avatars**: generate a hero that looks just like you.

---

## 🛠️ How It Works

1.  **Ingestion**: You provide the source material (Text, PDF, or Image).
2.  **Reasoning**: **Gemini 2.0 Pro** analyzes the content to extract key facts and generate a game script (manifest).
3.  **Visualization**: **Gemini 2.5 Flash** generates assets in parallel threads—Player, Background, and Bosses.
4.  **Battle**: You fight through the "dungeon". Correct answers deal damage; incorrect answers hurt you.
5.  **Growth**: Performance data is saved to your local stats and the Grimoire for future review.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/clash-of-minds.git
    cd clash-of-minds
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    # Your Gemini API Key (Required)
    VITE_GEMINI_API_KEY=your_api_key_here

    # WebSocket Server URL (Optional - for Production)
    # Leave empty for local development to use the proxy
    VITE_SOCKET_SERVER_URL=
    ```

4.  **Start the Development Server**
    ```bash
    # Terminal 1: Start the Backend (Socket.io)
    npm run start

    # Terminal 2: Start the Frontend (Vite)
    npm run dev
    ```

5.  **Open the App**
    Visit `http://localhost:3000` to start your adventure!

---

## 🏗️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **AI Core**: Google GenAI SDK (Gemini 2.0 Pro & Flash)
- **Backend (Real-time)**: Node.js, Express, Socket.IO
- **State Management**: React Context + LocalStorage Persistence
- **Icons**: Heroicons & Lucide React

---

## 🤝 Contributing

Join the battle! Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Made with ❤️ for the Gemini 2025 Hackathon*
