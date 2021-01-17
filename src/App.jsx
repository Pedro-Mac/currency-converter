import React from "react";

import "./App.scss";

import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Main from "./components/Main";
import GroupedRedirects from "./components/GroupedRedirects";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Main />
      <GroupedRedirects />
      <Footer />
    </div>
  );
}

export default App;
