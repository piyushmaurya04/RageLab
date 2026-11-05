# RageLab

> **Your patience is our playground.**

RageLab is a playful, slightly mischievous collection of interactive internet experiments designed to test your patience, challenge your decision-making, and make you laugh along the way.

Expect buttons that refuse to cooperate, questions that make absolutely no sense, suspiciously long loading screens, and memes that test how well you know the internet.

**Five experiments. Zero productive outcomes. A questionable use of your free time.**

---

## Project status

🚧 **In development** — the initial website foundation and experiment experience are being planned and built in phases. The experiments listed below describe the intended experience; they should not be considered implemented until their gameplay is added.

## Experiments

The current planned visitor journey is:

| Order | Experiment | What to expect |
| --- | --- | --- |
| 01 | **Don't Click the Button** | A forbidden button that gets increasingly persuasive the longer you resist. |
| 02 | **Impossible IQ Test** | Two absurd mini-tests that question your logic and your trust in the Internet. |
| 03 | **Button That Won't Cooperate** | A simple click challenge where the button has plans of its own. |
| 04 | **Fake Loading Simulator** | A suspenseful loading experience that may lead absolutely nowhere. |
| 05 | **Guess the Meme Dialogue** | Three meme-image questions, each with four possible dialogue options. Pick the right answer. |
| 06 | **Betrayal Quiz** | A personality quiz that uses your own answers and actions for a playful final roast. |

The experiments will be developed incrementally after the base website is in place.

## Experience and design goals

- **Mobile-first:** designed primarily for visitors opening the site from an Instagram bio link.
- **Distinctive visual identity:** expressive typography, deliberate layouts, playful details, and a polished product feel.
- **Fun interactions:** responsive controls, thoughtful motion, surprising feedback, and humorous copy.
- **Shareable moments:** experiment results and achievement cards that visitors can share with friends.
- **Accessible and usable:** keyboard support, visible focus states, readable contrast, touch-friendly controls, and reduced-motion support.
- **Fast and lightweight:** keep the experience responsive and avoid unnecessary dependencies.

RageLab should feel like a carefully designed independent entertainment product—not a generic template.

## Technology stack

The planned frontend stack:

- **React** — UI
- **TypeScript** — type safety
- **Vite** — development server and build tooling
- **Tailwind CSS** — styling
- **React Router** — client-side navigation
- **Framer Motion** — interface and interaction animations
- **Lucide React** — icons
- **LocalStorage** — local preferences and progress
- **Canvas / browser sharing APIs** — shareable result cards where appropriate

## Frontend-only architecture

RageLab is intended to run entirely in the browser.

- No application backend
- No database
- No authentication
- No server-side API dependencies
- No API keys required

Local progress and preferences may be stored in the visitor's browser using LocalStorage. This means that data is device- and browser-specific; it is not synchronized across visitors or devices.

## Getting started

Once the application source has been added to this repository, install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

> These commands assume the planned Vite project structure and corresponding npm scripts are present.

## Deployment

The planned hosting target is **Netlify**.

For a Vite single-page application, the typical build settings are:

- Build command: `npm run build`
- Publish directory: `dist`

Client-side routes should be configured to fall back to `index.html` so that directly opening or refreshing an experiment URL works correctly.

## Roadmap

- [ ] Set up the React + TypeScript + Vite application
- [ ] Establish the RageLab design system and responsive navigation
- [ ] Build the mobile-first landing page
- [ ] Add the experiment catalogue and individual experiment routes
- [ ] Implement the six planned experiments
- [ ] Add local progress, achievements, and result cards
- [ ] Add social sharing and polish the mobile experience
- [ ] Configure and deploy to Netlify

## Guiding principle

**Make it fun to lose.**

RageLab should frustrate visitors only in the playful context of its experiments—not through broken navigation, inaccessible controls, deceptive UI, or genuinely frustrating usability.

---

Built for curiosity, comedy, and questionable time management.
