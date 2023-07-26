import { useAppSelector } from "redux/hooks";
import { Textarea } from '@mantine/core';

import { GameActionTypesById, Player } from "types/volleyballTool.New.Types";

import "styles/gameAction.scss";

const GameActionsComponent = (props: { player: Player }) => {
  const { player } = props;
  // all game actions
  const gameActions = useAppSelector((selector) => selector.gameActionSlice);

  // don't do anything if nothing is selected
  if (!player) return null;

  // current player's latest recorded game action
  const gameAction = gameActions.byId[player.actionIds[0]];
  const gameActionType = GameActionTypesById?.[gameAction?.type];

  return (
    <div className="vt-game-actions-container">
      {gameAction && (
        <div className="vt-game-action-properties">
          {/* show number of actions and score */}
          <section className="vt-tools-property vt-game-action-type">
            <label className="vt-tools-property-label">Action</label>
            <div className="vt-tools-property-value">{gameActionType.name}</div>
          </section>
          <section className="vt-tools-property vt-game-action-score">
            <label className="vt-tools-property-label">Score</label>
            <div className="vt-tools-property-value">{gameActionType.score}</div>
          </section>
          <section className="vt-tools-property vt-game-action-notes">
            <label className="vt-tools-property-label">Notes</label>
            {/* <Textarea disabled value={gameAction.notes}/> */}
            <div className="vt-tools-property-value vt-display-long-text">{gameAction.notes}</div>
          </section>
        </div>
      )}
    </div>
  );
};

export default GameActionsComponent;
