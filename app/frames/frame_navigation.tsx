import React, { useEffect, useState, useId, MouseEvent, MouseEventHandler } from 'react';
import {TNavigationProps, } from "../lib/types"
import SelectedTab from '../lib/button';

function NavigationFrame(navigationProps: TNavigationProps){
    return(
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 justify-center">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                    <div >
                        <div className="flex space-x-3 justify-center">
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationFrame;