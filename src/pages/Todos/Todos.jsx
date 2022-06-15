import React from "react";
import "./Todos.css";

const Todos = () => {
  return (
    <div className={"flex justify-center w-full pt-10"}>
      <div className="flex flex-col gap-3 items-center w-full mx-8 md:max-w-xl lg:max-w-2xl">
        {/*  New Task Component */}
        <div
          className={
            "flex justify-between items-center h-14 w-full rounded-2xl overflow-hidden bg-white drop-shadow-md border-blue-700"
          }
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            />
          </div>
        </div>
        <div
          className={
            "flex justify-between items-center h-14 w-full rounded-xl drop-shadow-md"
          }
        >
          <div className="relative h-full w-full">
            {/*  Check Css Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 cursor-pointer">
              <div className="h-6 w-6 rounded-full border-2 border-gray-400/75 dark:border-gray-200/75 dark:hover:border-gray-200 hover:scale-105 active:scale-95 hover:border-gray-400 transition-all ease-out duration-200"></div>
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="rounded-xl bg-white border-0 dark:bg-secondary-dark-bg/75 text-gray-900 text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-300 block h-full w-full pl-14 p-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="name@flowbite.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
