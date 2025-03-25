# High Level Tasks

1. ~~Add new home page, which will show existing/saved games as well as the possibility to create a new one~~
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
3. Fix `ScoreBoard` component. Update `score` store and slices ~~(design a better store for this)~~.
  - ~~Update saved store with a new one that has initialized scores in it (start it over)~~
  - Method to properly add points up (if it one team wins increment the sets won counter)
  - Extract `onStartTrackingClick` into a new function called `startGame` or `initializeGame`
4. ~~Add the volleyball~~
5. ~~Create a new team and save it (Japan's team)~~
6. ~~Separate framework code from the rest for VolleyballComponent (separation of concerns)~~
7. ~~Write down MVP requirements (limit the scope and remove bike-shedding)~~
8. ~~Convert MVP requirements to tasks~~
9. Add volleyball position to the gameState dependencies
10. Perform "separation of concerns" refactoring for the MVP components

## Out of scope

1. Add validation to the game creation form
2. Use forms everywhere
3. Refactor CSS themes (using copilot add CSS themes with CSS variables)
4. Modernize `HomePage.tsx`

# Notes

On the current machine [link](http://localhost:5173/game/8bdcd54e-e542-44be-8463-f8afeefeef60) can be used for quick half court setups


## MVP

1. As a user I want to be able to create a new team and add players
2. As a user I want to be able to start tracking using just a single team
3. **[Out of scope]** As a user I want to be able to create 2 teams and start full court tracking
4. As a user I want to be able to move player on the court
5. As a user I want to be able to add game actions such as, pass, serve, set, spike, etc. as well as give a score to those actions
6. As a user I want to be able to change the score of the other team manually to keep the records accurate
7. As a user I want the system to calculate the score automatically in case I submit certain actions that result in a point (such as a Kill, or an Ace)
8. As a user I want to be able to see player stats once the game is over or when I click on show stats btn
9. **[Out of scope]** As a user I want to be able to export those stats in JSON format for safekeeping
10. As a user I want to be ale to reset the game so I can start tracking a new one
11. **[Out of scope]** As a user I want to be able to save pre determined player positions so when I click rotate players will rotate to their default positions
12. **[Out of scope]** As a user I want to be able to zoom in and out the view using the pinch touch controls or the mouse wheel

