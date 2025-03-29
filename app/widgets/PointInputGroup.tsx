import React from 'react';
import GridBox from '../components/gridbox';
import LabeledInput from '../components/input';
import { TPatternPoint } from '../models/types';
import './styles/PointInputGroup.css';
import LabelBox from '../components/label';

type TPatternPointChangeFunction = (id: number, field: keyof TPatternPoint, value: number) => void;

type PointInputGroupProps = {
    id: number;
    point?: TPatternPoint;
    onChange?: TPatternPointChangeFunction;
    prefix?: string;
}

const PointInputGroup: React.FC<PointInputGroupProps> = ( props ) => {
    
    const countId = `${props.prefix}count-${props.id}`;
    const expectationId = `${props.prefix}expectation-${props.id}`;
    const volatilityId = `${props.prefix}volatility-${props.id}`;

    const handleChange: TPatternPointChangeFunction = (id, field, value) => {
        if (props.onChange) {
            props.onChange(id, field, value);
        }
    };

    return (
        <div key={props.id} className="input-group">
            <GridBox
                elements={[
                    {
                        element: 
                            <LabelBox 
                                title='P.'
                                value={props.id}
                            />, 
                    },
                    {
                        element: 
                            <LabeledInput
                                id={countId}
                                type="number"
                                title="Count"
                                shortTitle="C"
                                placeholder="Enter count"
                                value={props.point?.count ?? 0}
                                textColor="black"
                                onChange={(e) => handleChange(props.id, 'count', Number(e.target.value))}
                            />, 
                    },
                    {
                        element: 
                            <LabeledInput
                                id={expectationId}
                                type="number"
                                title="Expectation"
                                shortTitle="E"
                                placeholder="Enter expectation"
                                value={props.point?.expectation ?? 0}
                                textColor="black"
                                onChange={(e) => handleChange(props.id, 'expectation', Number(e.target.value))}
                            />
                    },
                    {
                        element: 
                            <LabeledInput
                                id={volatilityId}
                                type="number"
                                title="Volatility"
                                shortTitle="V"
                                placeholder="Enter volatility"
                                value={props.point?.volatility ?? 0}
                                textColor="black"
                                onChange={(e) => handleChange(props.id, 'volatility', Number(e.target.value))}
                            />, 
                    }
                ]}
                columns={4}
                rows={1}            
            />
        </div>
    );
};

export default PointInputGroup;