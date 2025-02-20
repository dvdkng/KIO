// eslint-disable-next-line no-unused-vars
import React from "react";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";

const App = () => {
  return (
    <div className="flex w-full h-screen bg-neutral-800 p-10 gap-10 *:text-white *:text-sm">
      <SideBar />
      <Chat />
    </div>
  );
};

export default App;
