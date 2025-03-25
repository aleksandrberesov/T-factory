import React from 'react';
import { TNavigationFrameProps } from "./types"
import SelectedTab from '../components/button';
import DropMenu from '../components/drop-menu';
import { LanguageIDs } from '../libs/lib.localization';

function NavigationFrame(navigationProps: TNavigationFrameProps){
    const ChangeLanguage = (id: number)=>{
        if (navigationProps.setLanguage!==undefined) {
            navigationProps.setLanguage(LanguageIDs[LanguageIDs.findIndex(element => element.id === id)].element);        
        }
    };

    function CreateButton(id: number): React.JSX.Element{
        return (
            <div className='flex-col gap-y-2 col-span-2'>
                <SelectedTab
                    id={id}
                    title={navigationProps.getWord(id)} 
                    style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white w-full"
                    onselected={navigationProps.onselected}
                />
            </div>    
        );
    };

    return(
        <div className="w-full bg-gray-800">
            <div className="grid grid-cols-7 gap-2 m-2">
                    {CreateButton(0)}
                    {CreateButton(1)}
                    {CreateButton(2)}
                <div>             
                    <DropMenu
                        elements={LanguageIDs}
                        selected={LanguageIDs.findIndex(element => element.element === navigationProps.lang)}
                        style="rounded-md px-3 py-2 text-sm font-medium"
                        dropDirection='down'
                        onselected={ChangeLanguage}
                        backgroundcolor='yellow'
                        textcolor='black'
                    /> 
                </div>
            </div>    
        </div>
    );
}

export default NavigationFrame;