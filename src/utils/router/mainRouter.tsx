import App from "components/App";
import HomePage from "features/homePage/HomePage";
import VolleyballTools from "components/VolleyballTool/VolleyballTool.Component";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import GameSetupComponent from "features/gameSetup/GameSetup";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.GAME_SETUP,
        element: <GameSetupComponent />,
      },
      {
        path: ROUTES.GAME(),
        element: <VolleyballTools />,
      },
    ],
  },
]);
