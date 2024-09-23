import React, { useState } from 'react';
import { TDropMenuProps } from './types';
import SelectedTab from './button';

function DropMenu( menuprops: TDropMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuprops.selected);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const SelecItem = (id: number) =>{
    setIsOpen(false);
    setSelectedItem(id);
  };

  const listItems = menuprops.elements.map((item) =>
    <SelectedTab id={item.id} title={item.element} onselected={SelecItem}/>
    //<a key={item.id} href="#item1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >{item.element}</a>
  );

  function GetList(): React.JSX.Element {
    return(
      <div className="origin-top-right absolute -translate-y-full z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <p className=' text-gray-700 '>{menuprops.title}</p>
        <div className="py-1">
          {listItems} 
        </div>
      </div>
    );
  };

  return (
    <div  className="relative inline-block text-left">
        <SelectedTab 
            id="options-menu"
            title={menuprops.elements[selectedItem].element} 
            textcolor={menuprops.textcolor} 
            backgroundcolor={menuprops.backgroundcolor}
            onclick={toggleDropdown}
        />
        {isOpen && (GetList())}
    </div>
  );
}

export default DropMenu;