import { useState } from "react";
import { Select, SelectItem, TextInput, Collapse, ColorInput } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { SelectedPlayer } from "types/reduxStore.Types";
import { updatePlayerInfo } from "components/Players/players.Slice";
import { PositionsById } from "types/volleyballTool.Types";

import "styles/inspector.scss";

import NewGameActionComponent from "./NewGameAction.Component";
import GameActionsComponent from "./GameActions.Component";

const selectPositions: SelectItem[] = Object.entries(PositionsById).map(([key, position]) => ({
  value: key,
  label: position.name,
}));

/**
 * Shows properties and info of selected items
 * @returns React Component
 */
const InspectorComponent = () => {
  const dispatch = useAppDispatch();

  const players = useAppSelector((selector) => selector.players);
  // player locations
  const playersLocations = useAppSelector((selector) => selector.playersLocations);
  // current game state
  const { currentState } = useAppSelector((selector) => selector.gameState);

  const { selectedId } = useAppSelector((selector) => selector.inspector);

  const [isInternalCollapsed, setIsInternalCollapsed] = useState(true);

  if (!selectedId) return null;

  const location = playersLocations.byGameStateId[currentState ?? ""]?.[selectedId] ?? playersLocations.byPlayerId[selectedId];

  // collapse/open internal section

  // current selection
  const selectedItem: SelectedPlayer | null = selectedId
    ? {
        internal: {
          id: selectedId,
          color: players.byId[selectedId].color,
          x: location.x,
          y: location.y,
          r: players.byId[selectedId].r,
        },
        visual: {
          avgScore: players.byId[selectedId].score,
          name: players.byId[selectedId].name,
          position: players.byId[selectedId].positionId,
          jerseyNumber: players.byId[selectedId].jerseyNumber,
        },
        stats: [],
      }
    : null;

  //#region framework methods
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer = { ...players.byId[selectedId], name: event.currentTarget.value };

    dispatch(updatePlayerInfo(updatedPlayer));
  };

  const onPositionChange = (value: string) => {
    const updatedPlayer = { ...players.byId[selectedId], positionId: value };

    dispatch(updatePlayerInfo(updatedPlayer));
  };

  /**
   * Handles internal properties title click event
   * @param event - Click event
   */
  const onInternalPropertiesTitleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    // toggle the section
    toggleInternalProperties();
  };

  //#endregion

  const toggleInternalProperties = () => {
    setIsInternalCollapsed(!isInternalCollapsed);
  };

  return (
    <div className="vt-tools-inspector-container">
      <div className="vt-tools-properties-title">Properties</div>
      {selectedItem && (
        <div className="vt-tools-properties">
          <section className="vt-tools-properties-section">
            <div className="vt-tools-properties-section-title clickable" onClick={onInternalPropertiesTitleClick}>
              internal
            </div>
            <Collapse in={!isInternalCollapsed}>
              <div className="vt-tools-property">
                <label className="vt-tools-property-label">id</label>
                <div className="vt-tools-property-value">{selectedItem.internal.id}</div>
              </div>
              <div className="vt-tools-properties-hz">
                <div className="vt-tools-property">
                  <label className="vt-tools-property-label">x</label>
                  <div className="vt-tools-property-value">{selectedItem.internal.x.toFixed(2)}</div>
                </div>
                <div className="vt-tools-property">
                  <label className="vt-tools-property-label">y</label>
                  <div className="vt-tools-property-value">{selectedItem.internal.y.toFixed(2)}</div>
                </div>
                <div className="vt-tools-property">
                  <label className="vt-tools-property-label">r</label>
                  <div className="vt-tools-property-value">{selectedItem.internal.r.toFixed(2)}</div>
                </div>
              </div>
              <div className="vt-tools-property">
                <label className="vt-tools-property-label">color</label>
                <ColorInput value={selectedItem.internal.color} disabled />
              </div>
            </Collapse>
          </section>
          <section className="vt-tools-properties-section">
            <div className="vt-tools-properties-section-title">visual</div>
            <div className="vt-tools-property">
              <label className="vt-tools-property-label">Name</label>
              <TextInput name="PlayerName" variant="filled" value={selectedItem.visual.name} onChange={onNameChange} />
            </div>
            <div className="vt-tools-property">
              <label className="vt-tools-property-label">Position</label>
              <Select
                name="Position"
                data={selectPositions}
                variant="filled"
                value={selectedItem.visual.position}
                onChange={onPositionChange}
              />
            </div>
          </section>
          <section className="vt-tools-properties-section">
            <div className="vt-tools-properties-section-title">stats</div>
            <NewGameActionComponent />
            <GameActionsComponent player={players.byId[selectedId]} />
          </section>
        </div>
      )}
    </div>
  );
};

export default InspectorComponent;
