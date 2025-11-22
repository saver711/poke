# PokéDex

A high-performance Pokémon index application built with Next.js 15, leveraging modern features like **React Server Components (RSC)** and **TanStack Query** with React Suspense for data fetching.

***

## 🌐 Live Demos

* **Primary (Netlify):** [https://bespoke-stardust-2936e0.netlify.app/](https://bespoke-stardust-2936e0.netlify.app/)
* **Backup (Vercel):** [https://poke-chi-three.vercel.app/](https://poke-chi-three.vercel.app/)
    > **Note:** *I stand against Vercel's recent statements. This deployment exists solely for uptime redundancy as I currently do not trust Netlify's persistence for this specific project.*

***

## 🚀 Key Technologies & Architecture

* **Next.js 15** with **React 19** for modern server and client components.
* **TypeScript** for end-to-end type safety.
* **TanStack Query** (React Query) for efficient, declarative, and suspended data fetching.
* **React Suspense** utilizing **Shadcn UI Skeleton** components.
* **TailwindCSS 4** for utility-first styling.
* Next.js **API Handlers** for secure and abstracted data fetching from the PokeAPI.

***

## 🛠 Development Setup

* **Biome** (modern linter & formatter) replacing ESLint + Prettier
* **Vitest + Testing Library** for fast unit testing
* **Husky + Lint-Staged** for pre-commit hooks & clean git history
* **Commitlint** for conventional commits

***

## ⚙️ CI/CD with GitHub Actions

* ✅ Linting (Biome)
* ✅ Branch naming enforcement
* ✅ Commit message validation (Conventional Commits)
* ✅ Unit tests (Vitest + coverage)

***

## 🚦 Getting Started

### Option 1: 🐳 Using Docker (Recommended)

Running with Docker ensures you have the exact environment and dependencies isolated from your local machine.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/saver711/poke
    cd poke
    ```

2.  **Run with Docker Compose**
    ```bash
    docker-compose up --build
    ```

3.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Option 2: 💻 Local Setup

If you prefer running Node directly on your machine.

1.  **Install dependencies**
    ```bash
    pnpm i
    ```

2.  **Run dev server**
    ```bash
    pnpm dev
    ```

3.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

***

## 📬 Connect

**Ahmed Hassan** [LinkedIn Profile](https://www.linkedin.com/in/ahmedhassan711/)