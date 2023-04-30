import { useState } from "react";
import { Select, SelectItem, TextInput, Collapse, ColorInput, Button, Modal } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { SelectedPlayer } from "types/reduxStore.Types";
import { updatePlayerInfo } from "components/Players/players.Slice";
import { PositionsById } from "types/volleyballTool.Types";

import "styles/inspector.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";

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

  const players = useAppSelector((selector) => selector.playersReducer);
  const circles = useAppSelector((selector) => selector.circlesReducer);
  const { selectedId } = useAppSelector((selector) => selector.inspectorSlice);

  // collapse/open internal section
  const [isInternalCollapsed, setIsInternalCollapsed] = useState(true);

  // stats modal
  const [isNewActionModalOpen, setIsNewActionModalOpen] = useState(false);

  const selectedItem: SelectedPlayer | null = selectedId
    ? {
        internal: {
          id: selectedId,
          color: circles.byId[selectedId].color,
          x: circles.byId[selectedId].cx,
          y: circles.byId[selectedId].cy,
          r: circles.byId[selectedId].r,
        },
        visual: {
          avgScore: players.byId[selectedId].averageScore,
          name: players.byId[selectedId].name,
          position: players.byId[selectedId].positionId,
          jerseyNumber: players.byId[selectedId].jerseyNumber,
        },
        stats: [],
      }
    : null;

  //#region framework methods
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: refactor
    if (!selectedId) return;

    const updatedPlayer = { ...players.byId[selectedId], name: event.currentTarget.value };

    dispatch(updatePlayerInfo(updatedPlayer));
  };

  const onPositionChange = (value: string) => {
    // TODO: refactor
    if (!selectedId) return;

    const updatedPlayer = { ...players.byId[selectedId], positionId: value };

    dispatch(updatePlayerInfo(updatedPlayer));
  };

  /**
   * Handles internal properties title click event
   * @param event - Click event
   */
  const onInternalPropertiesTitleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // toggle the section
    toggleInternalProperties();
  };

  /**
   * Handles 'new action' btn click event
   * @param event - Click event
   */
  const onNewActionButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    openNewActionModal();
  };
  //#endregion

  const closeNewActionModal = () => {
    setIsNewActionModalOpen(false);
  };

  const openNewActionModal = () => {
    setIsNewActionModalOpen(true);
  };

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
                {/* <div className="vt-tools-property-value">{selectedItem.internal.color}</div> */}
              </div>
            </Collapse>
          </section>
          <section className="vt-tools-properties-section">
            <div className="vt-tools-properties-section-title">visual</div>
            <div className="vt-tools-property">
              <label htmlFor="" className="vt-tools-property-label">
                Name
              </label>
              <TextInput name="PlayerName" variant="filled" value={selectedItem.visual.name} onChange={onNameChange} />
            </div>
            <div className="vt-tools-property">
              <label htmlFor="" className="vt-tools-property-label">
                Position
              </label>
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
            <Button
              fullWidth
              variant="outline"
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={onNewActionButtonClick}
            >
              New Action
            </Button>
            <Modal
              opened={isNewActionModalOpen}
              title="Create a new Action"
              onClose={closeNewActionModal}
              centered
              yOffset={0}
              xOffset={0}
            >
              <div className="vt-tools-property">
                <label htmlFor="" className="vt-tools-property-label">
                  Action Name
                </label>
                <TextInput
                  name="ActionName"
                  variant="filled"
                  value={selectedItem.visual.name}
                  onChange={onNameChange}
                />
              </div>
            </Modal>
          </section>
        </div>
      )}
    </div>
  );
};

export default InspectorComponent;
