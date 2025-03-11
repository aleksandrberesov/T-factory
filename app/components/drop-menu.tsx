import React, { useState, useRef, useEffect } from 'react';
import { TDropMenuProps } from './types';
import SelectedTab from './button';
import './drop-menu.css';

function DropMenu(menuprops: TDropMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuprops.selected);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const liststyle = menuprops.dropDirection === "down" ? "dropdown-down" : "dropdown-up";

  const SelecItem = (id: number) => {
    setIsOpen(false);
    setSelectedItem(id);
    if (menuprops.onselected !== undefined) {
      menuprops.onselected(id);
    }
  };

  const listItems = menuprops.elements.map((item) =>
    <SelectedTab 
      key={item.id} 
      id={item.id} 
      title={item.element} 
      onselected={SelecItem} 
      textcolor={menuprops.textcolor}  
      backgroundcolor={menuprops.backgroundcolor}
    />
  );

  useEffect(() => {
    if (parentRef.current) {
      setWidth(parentRef.current.offsetWidth);
      setHeight(parentRef.current.offsetHeight);
    }
  }, []);

  function GetList(): React.JSX.Element {
    return (
      <div 
        className={liststyle}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <p>{menuprops.title}</p>
        <ul>{listItems}</ul>
      </div>
    );
  };

  return (
    <div ref={parentRef} className='dropdown-container'>
      <SelectedTab 
        title={menuprops.elements[selectedItem].element} 
        textcolor={menuprops.textcolor} 
        backgroundcolor={menuprops.backgroundcolor}
        onclick={toggleDropdown}
        style="w-full h-full"
      />
      {isOpen && (GetList())}
    </div>
  );
}

export default DropMenu;