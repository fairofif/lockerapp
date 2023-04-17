import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Router from "./src/router/router";

const App = () => {
  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  )
}

export default App;
