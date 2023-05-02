import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* <a> might be unnecessary */}
        <a href="" class="flex items-center">
            <img src="" class="h-8 mr-3" alt="Phrazel Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PHRAZEL</span>
        </a>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to='/' class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</NavLink>
            </li>
            <li>
              <NavLink to='/ProfilePage' class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:text-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Profile</NavLink>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
            </li>
          </ul>
        </div>


      </div>
    </nav>
  )
}

export default Header