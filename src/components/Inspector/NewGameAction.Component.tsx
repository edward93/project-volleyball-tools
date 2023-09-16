import { Button, Select, SelectItem, Textarea } from "@mantine/core";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "reduxTools/hooks";

import { create as saveNewState } from "components/Timeline/gameState.Slice";
import { create as createNewGameAction } from "./gameAction.Slice";
import { addLocationToGameState } from "components/Players/playerLocation.Slice";
import { addGameAction } from "components/Players/players.Slice";

import "styles/stats.scss";
import { GameAction, GameActionTypesById, GameState } from "types/volleyballTool.New.Types";

const selectGameActions: SelectItem[] = Object.entries(GameActionTypesById).map(([key, action]) => ({
  value: key,
  label: action.name,
  group: action.category,
}));

/**
 * Component for adding a new stat
 */
const StatsComponent = () => {
  const dispatch = useAppDispatch();

  // current game
  const game = useAppSelector((selector) => selector.gameSlice);

  // current selected item (player)
  const { selectedId } = useAppSelector((selector) => selector.inspectorSlice);

  // collapse/open stats section
  const [showNewActionSection, setShowNewActionSection] = useState(false);
  // current action
  const [currentAction, setCurrentAction] = useState<GameAction>();

  const gameState = useRef<GameState | null>(null);

  //#region user input handlers
  /**
   * Select new game action
   * @param value
   */
  const onGameActionChange = (value: string) => {
    const updatedAction: GameAction = { ...(currentAction as GameAction), type: value };

    // update the current stat
    setCurrentAction(updatedAction);
  };

  /**
   * Handles stat notes changes
   * @param event - Input event
   */
  const onStatNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedAction: GameAction = { ...(currentAction as GameAction), notes: event.currentTarget.value };

    // update the current stat
    setCurrentAction(updatedAction);
  };

  /**
   * Handles 'new action' btn click event
   * @param event - Click event
   */
  const onNewActionButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedId) return;

    // show the section
    toggleStatsSection();

    // create new game state
    gameState.current = {
      id: uuidv4(),
      gameId: game.id,
    };

    // init a new obj
    const action: GameAction = {
      id: uuidv4(),
      playerId: selectedId,
      type: "",
      gameStateId: gameState.current.id,
    };

    setCurrentAction(action);
  };

  /**
   * Handles save stat btn click event
   * @param event - Click event
   */
  const onSaveStatButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // TODO: refactor
    if (!selectedId) return;

    // save the game state first
    if (gameState.current) dispatch(saveNewState(gameState.current));

    // create mew game action
    if (currentAction && gameState.current) {
      // associate locations with this state
      dispatch(addLocationToGameState({ gameStateId: gameState.current.id }));
      dispatch(createNewGameAction({ gameAction: currentAction, gameStateId: gameState.current.id }));
    }

    // add action id to the player's actionIds list
    if (currentAction) dispatch(addGameAction({ playerId: selectedId, gameAction: currentAction }));

    // cleanup
    setCurrentAction(undefined);
    gameState.current = null;

    // hide the section
    toggleStatsSection();
  };

  /**
   * Handles cancel stat btn click event
   * @param event - Click event
   */
  const onCancelStatButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // hide the section
    toggleStatsSection();

    // cleanup
    setCurrentAction(undefined);
    gameState.current = null;
  };
  //#endregion

  /**
   * Open and close stats section
   */
  const toggleStatsSection = () => {
    setShowNewActionSection(!showNewActionSection);
  };

  return (
    <div className="vt-tools-stats">
      <section hidden={!showNewActionSection} className="vt-new-stat">
        <div className="vt-tools-property">
          <label className="vt-tools-property-label">Event</label>
          <Select
            name="VolleyballGameAction"
            data={selectGameActions}
            variant="filled"
            value={currentAction?.type}
            withinPortal
            searchable
            onChange={onGameActionChange}
          />
        </div>
        <div className="vt-tools-property">
          <label className="vt-tools-property-label">Notes</label>
          <Textarea
            name="EventNotes"
            variant="filled"
            value={currentAction?.notes ?? ""}
            onChange={onStatNotesChange}
          />
        </div>
      </section>
      <div className="vt-tools-stats-actions">
        {showNewActionSection ? (
          <div className="vt-tools-new-stat-interaction-actions">
            <Button fullWidth variant="filled" color="teal" onClick={onSaveStatButtonClick}>
              Save
            </Button>
            <Button fullWidth variant="filled" color="#ce8976" onClick={onCancelStatButtonClick}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            fullWidth
            variant="outline"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={onNewActionButtonClick}
          >
            New Action
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatsComponent;
