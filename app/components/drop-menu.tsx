import React, { useState, useRef, useEffect } from 'react';
import { TDropMenuProps } from './types';
import SelectedTab from './button';

function DropMenu( menuprops: TDropMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(menuprops.selected);
  const [width, setWidth] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const buttonstyle = [menuprops.style, "w-full" ].join(" ");
  const liststyle = [menuprops.dropDirection==="down" ? "translate-y-0": "-translate-y-full",  
                     "flex origin-top-right absolute justify-self-auto z-50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    ].join(" ");

  const SelecItem = (id: number) =>{
    setIsOpen(false);
    setSelectedItem(id);
    if (menuprops.onselected !==undefined){
      menuprops.onselected(id);
    }
  };

  const listItems = menuprops.elements.map((item) =>
    <SelectedTab 
      key={item.id} 
      id={item.id} 
      title={item.element} 
      onselected={SelecItem} 
      style={buttonstyle} 
      textcolor={menuprops.textcolor}  
      backgroundcolor={menuprops.backgroundcolor}
    />
  );

  useEffect(() => {
    if (parentRef.current) {
      setWidth(parentRef.current.offsetWidth);
    }
  }, []);

  function GetList(): React.JSX.Element {
    return(
      <div 
        className={liststyle}
        style = {{ width: `${width}px` }}
      >
        <p>{menuprops.title}</p>
        <div className="py-1 flex flex-wrap">
          {listItems} 
        </div>
      </div>
    );
  };

  return (
    <div  ref={parentRef}>
        <SelectedTab 
            title={menuprops.elements[selectedItem].element} 
            textcolor={menuprops.textcolor} 
            backgroundcolor={menuprops.backgroundcolor}
            onclick={toggleDropdown}
            style = "w-full h-full"
        />
        {isOpen && (GetList())}
    </div>
  );
}

export default DropMenu;