import React from 'react';
import Button from '../ui/button';
import Layout from '../ui/container';
import Grid from '../ui/grid';
import { IDictionary } from '../controllers/localization';
import useViewController from '../controllers/viewController';
import { TNavigationPanelProps } from './types';
import { TOnSelectedFunction } from "../libs/types";

const NavigationPanel: React.FC<TNavigationPanelProps> = (props) => {
    const dictionary = useViewController<IDictionary>(props.localizer.addView);

    function CreateButton(id: number | string, name: string,  proc?: TOnSelectedFunction): React.JSX.Element{
        return (
            <Button
                key={String(id)}
                id={id}
                title={name ? dictionary?.getWord(name) : dictionary?.language} 
                onSelected={proc}
                backgroundColor='red.200'
                textColor='white'
            />    
        );
    };

    return(
        <Layout backgroundColor='gray.100'>
            <Grid
                columns={4}
                rows={1}
                elements={
                    props.elements.map((item) => {
                       return{
                            element: CreateButton(item.id, item.name, props.onSelected)
                       } 
                    })  
                }                  
            />    
        </Layout>
    );
}

export default NavigationPanel;