import React from 'react';
import Button from '../ui/button';
import { IDictionary } from '../controllers/localization';
import useViewController from '../controllers/viewController';
import { TNavigationPanelProps } from './types';
import { TOnSelectedFunction } from "../libs/types";

const NavigationPanel: React.FC<TNavigationPanelProps> = (props) => {
    const dictionary = useViewController<IDictionary>(props.localizer.addView);

    function CreateButton(id: number | string, name: string,  proc?: TOnSelectedFunction): React.JSX.Element{
        return (
            <div key={String(id)} className='flex-col gap-y-2 col-span-2'>
                <Button
                    id={id}
                    title={name ? dictionary?.getWord(name) : dictionary?.language} 
                    onSelected={proc}
                />
            </div>    
        );
    };

    return(
        <div className="w-full bg-gray-800">
            <div className="grid grid-cols-8 gap-2 m-2">
                {props.elements.map((item) => CreateButton(item.id, item.name, props.onSelected))}   
            </div>    
        </div>
    );
}

export default NavigationPanel;