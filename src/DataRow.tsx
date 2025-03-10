import { ChangeEvent } from "react";
import { FileData } from "./types";

export interface DataRowProps {
  files: FileData[];
  selectedIndices: number[];
  handleFileCheckbox: (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

export default function DataRow({
  files,
  selectedIndices,
  handleFileCheckbox,
}: DataRowProps) {
  return (
    <>
      {files.map(({ name, device, path, status }, index) => (
        <tr className="datagrid__table__data-row" key={path}>
          <td>
            <input
              type="checkbox"
              onChange={(event) => handleFileCheckbox(event, index)}
              checked={selectedIndices.includes(index)}
            />
          </td>
          <td>{name}</td>
          <td>{device}</td>
          <td>{path}</td>
          <td>
            {status === "available" && <>&#128994; </>}
            <span>{status[0].toUpperCase()+status.slice(1)}</span>
          </td>
        </tr>
      ))}
    </>
  );
}
