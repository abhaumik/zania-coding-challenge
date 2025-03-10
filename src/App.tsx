import DatagridTable from "./DatagridTable";
import { files } from "./constants";
import "./App.scss";

function App() {
  return (
    <div className="datagrid">
      <div className="datagrid__title">Datagrid</div>
      <DatagridTable files={files} />
    </div>
  );
}

export default App;
