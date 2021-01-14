import "./App.scss";

import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Main from "./components/Main";
import GroupedRedirects from "./components/GroupedRedirects";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Main />
      <GroupedRedirects />
    </div>
  );
}

export default App;
