# High Level Tasks

1. Change the folder structure to this (https://redux.js.org/tutorials/essentials/part-2-app-structure)
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
2. Store current store (or part of it) into the local storage
3. Read the store (or part of it) from the local storage and update `preloadedState` in store.ts


# Notes
On the current machine http://localhost:5173/game/1880a3f6-b05b-4d6c-8d03-a82fa110375a - link can be used for quick half court setups