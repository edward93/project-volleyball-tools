import { Collapse, Tooltip } from "@mantine/core";
import { useState } from "react";
import { useAppSelector } from "reduxTools/hooks";

import { GameActionTypesById, Player } from "types/volleyballTool.New.Types";

import "styles/gameAction.scss";

/**
 * GameAction component - shows selected player's actions
 *
 * @param props - GameActions props
 * @returns GameActions component
 */
const GameActionsComponent = (props: { player: Player }) => {
  const { player } = props;
  const [isContentCollapsed, setIsContentCollapsed] = useState(true);
  // all game actions
  const gameActions = useAppSelector((selector) => selector.gameAction);
  // current game state id
  const { currentStateId } = useAppSelector((selector) => selector.gameState);
  const currentState = useAppSelector((selector) => selector.gameState.byId[currentStateId ?? ""]);

  // don't do anything if nothing is selected
  if (!player) return null;

  // current player's latest recorded game action or current select action (depends on the game state)
  const gameAction =
    gameActions.byId[currentState?.dependencies?.gameActionId ?? ""] ??
    gameActions.byId[gameActions.allIds[gameActions.allIds.length - 1]];

  const gameActionType = GameActionTypesById?.[gameAction?.type];

  // max possible score number of actions multiplied by max score
  const maxPossibleScore = player.actionIds.length * 3; // (score can go up to 3)

  // percentage
  const scorePercentage = ((player.score * 100) / maxPossibleScore).toFixed(1);

  /**
   * Handle info bar click events
   * @param event Click event
   */
  const onPanelInfoBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    // toggle
    setIsContentCollapsed(!isContentCollapsed);
  };

  return (
    <div className="vt-game-actions-container">
      {gameAction && player.id === gameAction.playerId && (
        <div className="vt-game-action-properties panel-container">
          <div className="vt-game-actions-info panel-info-bar clickable" onClick={onPanelInfoBarClick}>
            <section className="vt-game-actions-info-left panel-info-bar-txt">
              <label className="vt-tools-property-label panel-info-bar-label">Action:</label>
              <div className="vt-tools-property-value panel-info-bar-value">
                {player.actionIds.length - player.actionIds.indexOf(gameAction.id)}/{player.actionIds.length}
              </div>
            </section>
            <section className="vt-game-actions-info-right panel-info-bar-txt">
              <label className="vt-tools-property-label panel-info-bar-label">Total Score:</label>
              <Tooltip label={`${scorePercentage} %`} withArrow color="dark">
                <div className="vt-tools-property-value panel-info-bar-value">
                  {player.score}/{maxPossibleScore}
                </div>
              </Tooltip>
            </section>
          </div>
          <div className="vt-game-actions-latest-action">
            <Collapse in={!isContentCollapsed}>
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
                <div className="vt-tools-property-value vt-display-long-text">{gameAction.notes}</div>
              </section>
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameActionsComponent;
