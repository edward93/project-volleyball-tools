# Adding New Entities to The State
## Document Information
**Updated Date: 3/16/2025**

## Instructions
Currently `useGameStateHelpers` hook is used to automatically save the current game state to the store. `GameState` obj has the following structure </br>
```javascript
/** Represents an event on a timeline */
export type GameState = {
  /** Unique auto generated id */
  id: string;
  /** Game id */
  gameId: string;
  /** Time (optional) */
  time?: string;
  /** all the necessary components that are associated with this state and can be recovered */
  dependencies: {
    /** all player ids snapshot by this state */
    activePlayerIds: string[];
    /** all locations of current players snapshot by this state [playerId][playerLocationId]*/
    playerLocationIds: Record<string, string>;
    /** game action associated with this state (only one action per state) */
    gameActionId?: string;
  };
};
```
All the components that are associated/saved with this state are in the `dependencies`, thus when a new component needs to be saved when the game state is being saved, it must be added to the `dependencies` property. </br>
Afterwards `newGameState` method of `useGameStateHelpers` hook should be updated to save the newly added dependency
