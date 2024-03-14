import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid h-screen place-items-center bg-white dark:bg-[#14181F] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[#E5D714]">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white/45">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md border-2 border-[#E5D714] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#E5D714] hover:text-[#14181F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200 ease-out"
          >
            Go back home
          </Link>
          {/* <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
