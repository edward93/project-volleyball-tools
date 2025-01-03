import App from "components/App";
import GameSetupComponent from "features/gameSetup/GameSetup";
import VolleyballTools from "components/VolleyballTool/VolleyballTool.Component";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <GameSetupComponent />,
      },
      {
        path: ROUTES.GAME(),
        element: <VolleyballTools />,
      },
    ],
  },
]);
