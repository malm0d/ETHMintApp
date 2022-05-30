import React, { useState, useEffect } from "react";
import MainPage from "./components/MainPage";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <MainPage></MainPage>
  )
}

export default App;
