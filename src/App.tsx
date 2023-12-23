import { useState } from "react";
import NavBar from "./components/navbar/NavBar";
import Main from "./components/main/Main";
import Settings from "./components/settings/Settings";
import Graph from "./components/graph/Graph";
import { DEFAULT_DATA } from "./constants";
import { datapoint } from "./types";

import "./App.css";

function App() {
  const [data, setData] = useState<datapoint[]>(DEFAULT_DATA);
  return (
    <>
      <NavBar />
      <Main>
        <Settings setData={setData} />
        <Graph data={data} />
      </Main>
    </>
  );
}

export default App;
