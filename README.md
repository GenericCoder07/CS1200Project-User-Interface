# Do You Agree? — React Native (Expo) Skeleton

This is a minimal Expo + TypeScript app for iOS with two screens:

- **Ask** → compose/pick a question, generate a short mock AI reply
- **Vote** → agree/disagree buttons, progress bar, and clipboard share

## Quick Start (Windows)

1. Install Node.js LTS and Git.
2. Open **Developer PowerShell** or **Command Prompt** in this folder.
3. Run: `run-ios.bat`

The script will:
- install dependencies
- start the Metro bundler
- open the iOS Simulator (if you have Xcode installed) with `expo start --ios`

## Scripts

- `npm run start` — start Metro bundler
- `npm run ios` — open iOS simulator
- `npm run android` — open Android (if installed)
- `npm run web` — run web preview

## Files

- `App.tsx` — Navigation shell (Ask → Vote)
- `src/screens/AskScreen.tsx` — compose/pick question
- `src/screens/VoteScreen.tsx` — voting UI + counts
- `src/theme.ts` — shared colors
