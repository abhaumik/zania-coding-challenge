import { ChangeEvent, ForwardedRef, forwardRef } from "react";
import cc from "classnames";

export interface ActionBarProps {
  selectedText: string;
  isDownloadDisabled: boolean;
  handleHeaderCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDownloadClick: () => void;
}

const ActionBar = forwardRef(
  (
    {
      selectedText,
      isDownloadDisabled,
      handleDownloadClick,
      handleHeaderCheckbox,
    }: ActionBarProps,
    headerCheckboxRef: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="datagrid__table__header-action-bar">
        <input
          type="checkbox"
          ref={headerCheckboxRef}
          onChange={handleHeaderCheckbox}
        />
        <div>{selectedText} Selected</div>
        <div
          className={cc("datagrid__table__header-action-bar__download-btn", {
            disabled: isDownloadDisabled,
          })}
          onClick={handleDownloadClick}
        >
          &#11015; Download Selected
        </div>
      </div>
    );
  }
);

export default ActionBar;
