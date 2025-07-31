import React from "react";
import WhiteBoard from "./components/WhiteBoard";
const App = () => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-stone-900 text-black dark:text-white">
        <WhiteBoard />
      </div>
    </>
  );
};

export default App;
