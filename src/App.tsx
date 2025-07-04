import React from "react";
import "./App.css";

// Change this constant to modify the number of items in the sidebar
const SIDEBAR_ITEM_COUNT = 50;

const Sidebar: React.FC = () => {
  // Generate an array of N items
  const sidebarItems = Array.from(
    { length: SIDEBAR_ITEM_COUNT },
    (_, index) => `Item ${index + 1}`
  );

  return (
    <div className="sidebar">
      <ol className="sidebar-list">
        {sidebarItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

const Main: React.FC = () => {
  return (
    <div className="main">
      <div className="main-header">
        <h1>Main Header</h1>
      </div>
      <div className="main-content">
        <p>Main Content</p>
      </div>
    </div>
  );
};
function App() {
  return (
    <main className="container">
      <Sidebar />
      <Main />
    </main>
  );
}

export default App;
