import React, { useEffect, useState, useId, MouseEvent, MouseEventHandler } from 'react';
import { TNavigationProps } from "./types"
import SelectedTab from '../components/button';
import DropMenu from '../components/drop-menu';
import { AvailableLanguages, LanguageIDs } from '../libs/lib.localization';

function NavigationFrame(navigationProps: TNavigationProps){
    const ChangeLanguage = (id: number)=>{
        navigationProps.setLanguage(LanguageIDs[LanguageIDs.findIndex(element => element.id === id)].element);        
    };

    return(
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex flex-1 sm:items-stretch sm:justify-center">
                        <div className="flex space-x-3 ">
                            <SelectedTab
                                id={0}
                                title={navigationProps.getWord(0)} //"Profile"
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                            <SelectedTab
                                id={1}
                                title={navigationProps.getWord(1)} //"Trade"
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                            <SelectedTab
                                id={2}
                                title={navigationProps.getWord(2)} //"Statistic"
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                        </div>
                        <div className='sm:items-stretch'> 
                            <DropMenu
                                elements={LanguageIDs}
                                selected={LanguageIDs.findIndex(element => element.element === navigationProps.lang)}
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                dropDirection='down'
                                onselected={ChangeLanguage}
                            />    
                        </div>                   
                </div>
            </div>
        </nav>
    );
}

export default NavigationFrame;