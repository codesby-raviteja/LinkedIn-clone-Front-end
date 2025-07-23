import React from "react";
import ManageNetwork from "../components/ManageNetwork";

function Network() {
  return (
    <div className="flex flex-col md:grid grid-cols-12 w-full  max-w-7xl mx-auto mt-4 gap-4 px-2   ">
      <ManageNetwork />
      <div className="bg-white min-h-48 col-span-9 md:col-span-8 lg:col-span-9 "></div>
    </div>
  );
}

export default Network;
