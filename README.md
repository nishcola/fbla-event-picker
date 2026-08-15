# FBLA Event Picker

A browser-based guide that helps FBLA members find competitive events that fit their interests, preferred competition style, grade level, preparation time, and career goals.

<img width="2938" height="1284" alt="SCR-20260815-kpoz" src="https://github.com/user-attachments/assets/0c00a48c-9cd2-428c-ac8c-4a0f870893a6" />

## What it does

- Recommends the five best-fitting events from a 10-question quiz.
- Excludes introductory events for 11th and 12th graders.
- Lets students browse and search all listed events by category, format, and career cluster.
- Provides event descriptions, study topics, resources, and related-event suggestions.
- Supports side-by-side comparison of up to three events.
- Saves the most recent quiz results in the browser for 24 hours.

## Run locally

```bash
git clone https://github.com/nishcola/fbla-event-picker.git
npm install
npm run dev
```

Open the local URL shown by Vite.

## Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run typecheck # Run TypeScript checks
npm run lint      # Run Oxlint
```

## Project structure

```text
src/
  components/  Quiz, browse, result, event-detail, and comparison UI
  data/        Event catalog, descriptions, study topics, and resources
  logic/       Quiz scoring, navigation state, saved sessions, and similar-event matching
  types.ts     Shared domain types
```

## Updating event information

The event catalog lives in `src/data/events.ts`. Supporting content is stored by event ID in:

- `src/data/descriptions.ts`
- `src/data/topics.ts`
- `src/data/resources.ts`

When adding or renaming an event, keep its ID consistent across these files. Review the official FBLA competitive-event guidance before changing eligibility, format, or event details.

## Technology

React, TypeScript, and Vite. The app is client-side only and does not use a backend or user accounts.
