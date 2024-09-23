import React, { useState } from 'react';
import { TDropMenuProps } from './types';
import SelectedTab from './button';

function DropMenu( menuprops: TDropMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function GetList(): React.JSX.Element {
    return(
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <p className='bg-red-600'>dhfashflihasoifhoaishfoihasoifhoiashfoisao</p>
        <ul className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
        <li>Элемент 1</li>
        <li>Элемент 2</li>
        <li>Элемент 3</li>
        </ul>
        </div>
    );
  };

  function GetListA(): React.JSX.Element {
    return(
      <div className="origin-top-right absolute -translate-y-full z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <p className=' text-gray-700 '>{menuprops.title}</p>
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#item1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Элемент 1</a>
            <a href="#item2" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Элемент 2</a>
            <a href="#item3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Элемент 3</a>
        </div>
      </div>
    );
  };

  return (
    <div  className="relative inline-block text-left">
        <SelectedTab 
            id="options-menu"
            title={menuprops.title} 
            textcolor={menuprops.textcolor} 
            backgroundcolor={menuprops.backgroundcolor}
            onclick={toggleDropdown}
        />
        {isOpen && (GetListA())}
    </div>
  );
}

export default DropMenu;