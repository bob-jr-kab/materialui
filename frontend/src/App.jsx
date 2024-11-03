import Layout from "./layout/Layout";
import React from "react";
import { ScreenSizeProvider } from "./context/ScreenSizeContext";
function App() {
  return (
    <ScreenSizeProvider>
      <Layout />
    </ScreenSizeProvider>
  );
}

export default App;
