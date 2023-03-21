import { useAppSelector } from "../../redux/hooks";
import { SelectedPlayer } from "../../types/reduxStore.Types";

import "../../styles/inspector.scss";

/**
 * Shows properties and info of selected items
 * @returns React Component
 */
const InspectorComponent = () => {
  const players = useAppSelector((selector) => selector.playersReducer);
  const circles = useAppSelector((selector) => selector.circlesReducer);
  const { selectedId } = useAppSelector((selector) => selector.inspectorSlice);

  const selectedItem: SelectedPlayer | null = selectedId
    ? {
        internal: {
          id: selectedId,
          x: circles.byId[selectedId].cx,
          y: circles.byId[selectedId].cy,
          r: circles.byId[selectedId].r,
        },
        visual: {
          color: circles.byId[selectedId].color,
          avgScore: players.byId[selectedId].averageScore,
          name: players.byId[selectedId].name,
          position: players.byId[selectedId].position.name,
          jerseyNumber: players.byId[selectedId].jerseyNumber,
        },
        stats: [],
      }
    : null;

  return (
    <div className="vt-tools-inspector-container">
      <div className="vt-tools-properties-title">Properties</div>
      {selectedItem && (
        <div className="vt-tools-properties">
          <section className="vt-tools-properties-section">
            <div className="vt-tools-properties-section-title">internal</div>
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
          </section>
          <section className="vt-tools-properties-section">
            <div className="vt-tools-properties-section-title">visual</div>
            {Object.entries(selectedItem.visual).map(([key, value], index) => (
              <div className="vt-tools-property" key={index}>
                <label htmlFor="" className="vt-tools-property-label">
                  {key}
                </label>
                <div className="vt-tools-property-value">{value?.toString()}</div>
              </div>
            ))}
          </section>
          {/* {selectedItem.stats.length > 0 && (
            <section className="vt-tools-properties-section">
              <div className="vt-tools-properties-section-title">Stats</div>
              {Object.entries(selectedItem.stats.pop()).map(([key, value], index) => (
                <div className="vt-tools-property" key={index}>
                  <label htmlFor="" className="vt-tools-property-label">
                    {key}
                  </label>
                  <div className="vt-tools-property-value">{value.toString()}</div>
                </div>
              ))}
            </section>
          )} */}
        </div>
      )}
    </div>
  );
};

export default InspectorComponent;
