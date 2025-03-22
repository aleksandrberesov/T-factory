import React from 'react';
import GridBox from '../components/gridbox';
import LabeledInput from '../components/input';
import { TPatternPoint } from '../models/types';
import './PointInputGroup.css';

type TPatternPointChangeFunction = (id: number, field: keyof TPatternPoint, value: number) => void;

interface PointInputGroupProps {
    id: number;
    point?: TPatternPoint;
    onChange?: TPatternPointChangeFunction;
    prefix?: string;
}

const PointInputGroup: React.FC<PointInputGroupProps> = ({ id, point, onChange, prefix = '' }) => {
    const countId = `${prefix}count-${id}`;
    const expectationId = `${prefix}expectation-${id}`;
    const volatilityId = `${prefix}volatility-${id}`;

    const handleChange: TPatternPointChangeFunction = (id, field, value) => {
        if (onChange) {
            if (value >= 0) {
                onChange(id, field, value);
            }
        }
    };

    return (
        <div key={id} className="input-group">
            <GridBox
                elements={[
                    {
                        element: 
                            <label htmlFor={countId}>{id}</label>, 
                    },
                    {
                        element: 
                            <LabeledInput
                                id={countId}
                                type="number"
                                title="Count"
                                shortTitle="C"
                                placeholder="Enter count"
                                value={point?.count ?? 0}
                                textColor="black"
                                onChange={(e) => handleChange(id, 'count', Number(e.target.value))}
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
                                value={point?.expectation ?? 0}
                                textColor="black"
                                onChange={(e) => handleChange(id, 'expectation', Number(e.target.value))}
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
                                value={point?.volatility ?? 0}
                                textColor="black"
                                onChange={(e) => handleChange(id, 'volatility', Number(e.target.value))}
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