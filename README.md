# AIRQuiz: Real-Time AI Contest Engine

**AIRQuiz** is a full-stack, multiplayer quiz platform that uses generative AI to create instant competitive environments. Unlike static quiz apps, AIRQuiz allows a "Host" to generate a contest on any niche topic using natural language, which then creates a unique 4-digit Room ID for others to join and compete in real-time.

##  The Core Experience

1. **AI Synthesis:** A host enters a topic (e.g., "React Design Patterns" or "Telugu Cinema").
2. **Room Generation:** The server synthesizes 5-10 technical questions via OpenAI and generates a unique **Room ID**.
3. **Live Competition:** Players join via the Room ID. As they answer, a real-time leaderboard re-ranks participants using a "lifted-state" architecture.

---

##  Technical Stack

### Frontend (The Dashboard)

* **Next.js 16 (Turbopack):** Utilizing the latest App Router for high-performance client-side transitions.
* **Apollo Client:** Manages complex GraphQL mutations and local state synchronization.
* **Framer Motion:** Handles the "Live" feel of the leaderboard, physically re-ordering contestants as scores change.
* **Lucide React:** Minimalist iconography for a clean, developer-focused UI.

### Backend (The Brain)

* **Apollo Server 4:** A type-safe GraphQL gateway.
* **TypeScript & TSX:** Modern ESM (ECMAScript Module) execution environment for strict type safety across the API.
* **OpenAI GPT-4o-mini:** Structured JSON mode to ensure the AI always returns valid quiz data.
* **In-Memory Room Service:** A specialized service that manages shared contest state without the latency of a traditional database, ideal for "flash" contests.

---

##  Architecture Decisions

### 1. Symmetrical ESM Setup

Both the client and server are configured as **ESM-first**. This was a deliberate choice to ensure the project remains compatible with the 2026 Node.js ecosystem, moving away from legacy CommonJS patterns.

### 2. Service-Oriented Logic

The server logic is encapsulated in a `ScoreService`. This allows the application to be easily scaled or migrated to a Redis-based store in the future without touching the GraphQL resolvers.

### 3. State Management

Instead of over-engineering with Redux, I utilized **React State Lifting**. The `page.tsx` acts as the orchestrator, ensuring that `QuizCard` and `Leaderboard` stay in sync via shared props and callbacks.

---

##  How to Run Locally

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/AIRQuizGenerator.git
cd AIRQuizGenerator

```

### 2. Configure Environment

Create a `.env` file in the `/server` directory:

```text
OPENAI_API_KEY=your_key_here

```

### 3. Start the Backend

```bash
cd server
npm install
npm run dev

```

### 4. Start the Frontend

```bash
cd client
npm install
npm run dev

```

---

### About the Developer

I am a **Computer Science Master's student at Purdue University Fort Wayne (PFW)**. This project serves as a capstone of my interests in **Web Development (React/Vue)**, **Cloud Architecture (AWS)**, and **Full-Stack Engineering**. It demonstrates my ability to build real-time, AI-integrated systems that handle complex state synchronization.


