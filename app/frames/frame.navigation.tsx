import React, { useEffect, useState, useId, MouseEvent, MouseEventHandler } from 'react';
import { TNavigationProps } from "./types"
import SelectedTab from '../components/button';
import DropMenu from '../components/drop-menu';
import { LanguageIDs } from '../libs/lib.localization';

function NavigationFrame(navigationProps: TNavigationProps){
    const ChangeLanguage = (id: number)=>{
        navigationProps.setLanguage(LanguageIDs[LanguageIDs.findIndex(element => element.id === id)].element);        
    };

    return(
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-1 sm:px-1 lg:px-1">
                <div className="flex flex-1 sm:items-stretch sm:justify-left">
                        <div className="flex space-x-1 ">
                            <SelectedTab
                                id={0}
                                title={navigationProps.getWord(0)} //"Profile"
                                //style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                            <SelectedTab
                                id={1}
                                title={navigationProps.getWord(1)} //"Trade"
                                //style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                            <SelectedTab
                                id={2}
                                title={navigationProps.getWord(2)} //"Statistic"
                                //style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                        </div>
                                          
                </div>
                <div className='sm:items-stretch sm:justify-right'> 
                            <DropMenu
                                elements={LanguageIDs}
                                selected={LanguageIDs.findIndex(element => element.element === navigationProps.lang)}
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                dropDirection='down'
                                onselected={ChangeLanguage}
                            />    
                        </div> 
            </div>
        </nav>
    );
}

export default NavigationFrame;