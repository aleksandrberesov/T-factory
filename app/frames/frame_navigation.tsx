import React, { useEffect, useState, useId, MouseEvent, MouseEventHandler } from 'react';
import { TNavigationProps } from "../components/types"
import SelectedTab from '../components/button';

function NavigationFrame(navigationProps: TNavigationProps){
    return(
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex flex-1 sm:items-stretch sm:justify-center">
                    
                        <div className="flex space-x-3 ">
                            <SelectedTab
                                id={0}
                                title="Profile"
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                            <SelectedTab
                                id={1}
                                title="Trade"
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                            <SelectedTab
                                id={2}
                                title="Statistic"
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                onselected={navigationProps.onselected}
                            />
                        </div>
                        <div>
                            <SelectedTab
                                id={3}
                                title={navigationProps.lang}
                                style="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            />    
                        </div>
                    
                </div>
            </div>
        </nav>
    );
}

export default NavigationFrame;