import React from "react";
import { useAppSelector } from "../../redux/hooks";
import SvgVisualizerComponent from "../Visualizer/Visualizer.Component";

/**
 * Players component, renders players on the court
 * @returns React component
 */
const PlayersComponent = () => {
  /** players on the home team */
  const players = useAppSelector((selector) => selector.playersReducer);

  return (
    <>
      <SvgVisualizerComponent texts={Object.values(players.byId).reduce((p, c) => ({ ...p, [c.circleId]: c.name }), {})} />
    </>
  );
};

export default PlayersComponent;
