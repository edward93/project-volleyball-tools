export const ROUTES = {
  HOME: "/",
  GAME_SETUP: "/new-game",
  GAME: (id?: string) => (id === undefined ? `/game/:gameId` : `/game/${id}`),
};
