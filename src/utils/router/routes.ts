export const ROUTES = {
  HOME: "/",

  GAME: (id?: string) => (id === undefined ? `/game/:gameId` : `/game/${id}`),
};
