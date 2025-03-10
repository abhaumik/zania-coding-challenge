import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FileData } from "./types";
import ActionBar from "./ActionBar";
import DataRow from "./DataRow";

export default function DatagridTable({ files }: { files: FileData[] }) {
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(true);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const headerCheckboxRef = useRef<null | HTMLInputElement>(null);

  const handleFileCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const checked = event?.target?.checked;
    if (checked && !selectedIndices.includes(index)) {
      setSelectedIndices([...selectedIndices, index]);
    } else if (!checked && selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i != index));
    }
  };

  const handleHeaderCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.checked) {
      setSelectedIndices(Array.from(Array(files.length), (_, x) => x));
    } else if (event?.target?.checked === false) {
      setSelectedIndices([]);
    }
  };

  const handleDownloadClick = () => {
    if (!isDownloadDisabled) {
      window.alert(
        `Downloaded items\n${selectedIndices
          .map(
            (index) =>
              `Name: ${files[index].name} Device: ${files[index].device} Path:${files[index].path}`
          )
          .join("\n")}`
      );
    }
  };

  useEffect(() => {
    if (headerCheckboxRef && headerCheckboxRef.current) {
      if (selectedIndices.length === 0) {
        headerCheckboxRef.current.indeterminate = false;
        headerCheckboxRef.current.checked = false;
        setIsDownloadDisabled(true);
      } else if (selectedIndices.length < files.length) {
        headerCheckboxRef.current.indeterminate = true;
        headerCheckboxRef.current.checked = true;
        if (
          selectedIndices
            .map((index) => files[index].status)
            .every((status) => status === "available")
        ) {
          setIsDownloadDisabled(false);
        } else {
          setIsDownloadDisabled(true);
        }
      } else {
        headerCheckboxRef.current.indeterminate = false;
        headerCheckboxRef.current.checked = true;
        if (
          selectedIndices
            .map((index) => files[index].status)
            .every((status) => status === "available")
        ) {
          setIsDownloadDisabled(false);
        } else {
          setIsDownloadDisabled(true);
        }
      }
    }
  }, [selectedIndices, files]);

  return (
    <table className="datagrid__table">
      <thead>
        <tr className="datagrid__table__header-row">
          <th colSpan={5}>
            <ActionBar
              selectedText={
                selectedIndices.length === 0
                  ? "None"
                  : `${selectedIndices.length}`
              }
              isDownloadDisabled={isDownloadDisabled}
              handleDownloadClick={handleDownloadClick}
              handleHeaderCheckbox={handleHeaderCheckbox}
              ref={headerCheckboxRef}
            />
          </th>
        </tr>
        <tr className="datagrid__table__header-column-names datagrid__table__header-row">
          <th></th>
          <th>Name</th>
          <th>Device</th>
          <th>Path</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <DataRow
          files={files}
          selectedIndices={selectedIndices}
          handleFileCheckbox={handleFileCheckbox}
        />
      </tbody>
    </table>
  );
}
