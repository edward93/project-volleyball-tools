import { useAppSelector } from "../../redux/hooks";
import "../../styles/inspector.scss";

/**
 * Shows properties and info of selected items
 * @returns React Component
 */
const InspectorComponent = () => {
  const selectedItem = useAppSelector((selector) => selector.inspectorSlice);

  // TODO: add a new selected item, and show it's properties here
  return (
    <div className="vt-tools-inspector-container">
      <div className="vt-tools-properties-title">Properties</div>

      <div className="vt-tools-properties">
        {Object.entries(selectedItem).map(([key, value], index) => (
          <div className="vt-tools-property" key={index}>
            <label htmlFor="" className="vt-tools-property-label">
              {key}
            </label>
            <div className="vt-tools-property-value">{value.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspectorComponent;
