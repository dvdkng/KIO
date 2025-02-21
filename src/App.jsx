// eslint-disable-next-line no-unused-vars
import React from "react";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import Header from "./components/Header";

const App = () => {
  console.log("....")
  
  return (
    <div className="flex flex-col relative w-full h-screen bg-neutral-800 *:text-white *:text-sm">
      <Header />
      <div className="md:p-10 p-5 h-full md:flex md:gap-5">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default App;
