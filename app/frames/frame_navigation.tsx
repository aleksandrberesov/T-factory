import React, { useEffect, useState, useId } from 'react';

function NavigationFrame(){
    return(
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 justify-center">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                    <div >
                        <div className="flex space-x-3 justify-center">
                            <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</a>
                            <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Trade</a>
                            <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Statistic</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavigationFrame;