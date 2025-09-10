import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      <div className="flex items-center space-x-2">
        <div className="bg-purple-700 text-white font-semibold w-8 h-8 flex items-center justify-center rounded">
          M
        </div>
        <span className="font-semibold text-xl text-purple-700">Project</span>
      </div>
      <Menu className="text-gray-700 cursor-pointer" />
    </nav>
  );
};

export default Navbar;
