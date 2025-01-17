# High Level Tasks

1. Add new home page, which will show existing/saved games as well as the possibility to create a new one
2. Change the folder structure to this (https://redux.js.org/tutorials/essentials/part-2-app-structure) ongoing
   ```
   src/
   ├── app/
   │   ├── store.ts
   │   ├── rootReducer.ts (optional)
   │   └── App.tsx
   ├── features/
   │   ├── auth/
   │   │   ├── authSlice.ts
   │   │   ├── authSelectors.ts
   │   │   ├── authThunks.ts (if using thunks)
   │   │   └── Auth.tsx
   │   ├── products/
   │   │   ├── productsSlice.ts
   │   │   ├── productsSelectors.ts
   │   │   └── Products.tsx
   │   └── ... (more feature folders)
   ├── components/
   │   ├── Button.tsx
   │   ├── Input.tsx
   │   └── ... (more generic components)
   ├── utils/
   │   ├── api.ts
   │   └── ... (more utility functions)
   ├── index.tsx
   └── ... (other root-level files)
   ```
3. Fix `ScoreBoard` component
4. ~~Add the volleyball~~
5. ~~Create a new team and save it (Japan's team)~~
6. Separate framework code from the rest for VolleyballComponent
7. Add volleyball position to the gameState dependencies

## Out of scope

1. Add validation to the game creation form
2. Use forms everywhere

# Notes

On the current machine ~~http://localhost:5173/game/1880a3f6-b05b-4d6c-8d03-a82fa110375a~~ [link](http://localhost:5173/game/8bdcd54e-e542-44be-8463-f8afeefeef60) can be used for quick half court setups
