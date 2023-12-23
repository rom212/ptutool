import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Main from "./components/main/Main";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <>
      <NavBar />
      <Main>
        <Settings />
      </Main>
    </>
  );
}

export default App;
