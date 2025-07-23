import React from "react";

function ManageNetwork() {
  const components = ["Requests", "Connections"];

  return (
    <div className=" md:py-0 md:px-0 md:block sm:bg-white border-1 border-gray-300  md:min-h-48 col-span-3   md:col-span-4 lg:col-span-3 rounded md:sticky top-20">
      <p className="font-medium  py-2 md:mb-0 px-5 md:px-6 text-lg md:py-4 text-gray-800">Manage my network</p>
      <hr className="border-gray-400 "/>
     <div className="flex md:flex-col gap-2 px-4 py-2 md:p-0  ">
         {components.map((field) => {
        return (
          <span
            className="px-8 py-1 font-medium text-gray-600 text-center md:text-left md:py-2   border border-gray-500 md:border-0 cursor-pointer hover:bg-blue-100 md:hover:bg-gray-100 rounded-3xl md:rounded-none"
            key={field}
          >
            {field}
          </span>
        );
      })}
     </div>
    </div>
  );
}

export default ManageNetwork;
