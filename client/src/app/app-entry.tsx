import React from "react";
import PostsPage from "./pages/PostsPage";
import SettingsPanel from "./components/SettingsPanel";

import "normalize.css";
import "./styles/index.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <SettingsPanel />
      <PostsPage />
    </div>
  );
};

export default App;
