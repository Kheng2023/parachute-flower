# 🌸 Parachute Flower — The Flower Exercise

A web app for the **Flower Exercise** from *What Color Is Your Parachute?* by Richard N. Bolles.

Discover your ideal career by exploring 7 dimensions of who you are and what you want — then see it all as a printable flower diagram.

**🔗 Live App: [kheng2023.github.io/parachute-flower](https://kheng2023.github.io/parachute-flower/)**

## What Is the Flower Exercise?

The Flower Exercise is a self-inventory tool with **7 petals**, each representing one dimension of your ideal job:

| Petal | What It Covers |
|-------|----------------|
| 👥 **People** | Types of people you enjoy working with |
| 🏢 **Working Conditions** | Your preferred work environment |
| ⚡ **Transferable Skills** | Your favorite functional skills |
| 🌟 **Purpose & Mission** | What gives your work meaning |
| 📚 **Knowledges** | Favorite subjects & fields of expertise |
| 💰 **Money & Salary** | Salary needs and responsibility level |
| 🌍 **Geography** | Where you'd most like to live & work |

For each petal, you brainstorm items and then use **pairwise comparison** to rank them by priority. The final output is a visual flower summarizing your top priorities across all 7 dimensions.

## Features

- **All 7 petals** with petal-specific instructions and example items
- **Pairwise comparison engine** — compare every pair to produce accurate rankings
- **Undo support** — go back if you change your mind during comparisons
- **Money petal** as a form-based input (salary, responsibility, benefits)
- **SVG flower diagram** — visual summary of all your priorities
- **Print support** — print your flower to keep or share
- **Auto-save** — progress is saved to localStorage (survives page refresh)
- **Mobile responsive** — works on phones and tablets

## Tech Stack

- React 19 + Vite
- Plain CSS (no frameworks)
- localStorage for persistence
- GitHub Pages for hosting

## Getting Started

```bash
cd vite-version
npm install
npm run dev
```

Open `http://localhost:5173/parachute-flower/` in your browser.

## Deploy

```bash
npm run deploy
```

Deploys to GitHub Pages via `gh-pages`.

## License

See [LICENSE](LICENSE).
