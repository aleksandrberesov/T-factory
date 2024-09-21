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

  return (
    <div  className="relative inline-block text-left">
        <SelectedTab 
            title={menuprops.title} 
            textcolor={menuprops.textcolor} 
            backgroundcolor={menuprops.backgroundcolor}
            onclick={toggleDropdown}
        />
        {isOpen && (GetList())}
    </div>
  );
}

export default DropMenu;