import React, { useEffect, useRef, useState } from 'react';
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
    const [useShortTitles, setUseShortTitles] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const countId = `${prefix}count-${id}`;
    const expectationId = `${prefix}expectation-${id}`;
    const volatilityId = `${prefix}volatility-${id}`;

    const handleChange: TPatternPointChangeFunction = (id, field, value) => {
        if (onChange) {
            if (value>=0){
                onChange(id, field, value);    
            }
        }
    };

    useEffect(() => {
        const adjustFontSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                if (containerWidth < 300) {
                    containerRef.current.classList.add('small-font');
                    setUseShortTitles(true);
                } else {
                    containerRef.current.classList.remove('small-font');
                    setUseShortTitles(false);
                }
            }
        };

        adjustFontSize();
        window.addEventListener('resize', adjustFontSize);
        return () => window.removeEventListener('resize', adjustFontSize);
    }, []);

    return (
        <div key={id} className="input-group" ref={containerRef}>
            <GridBox
                elements={[
                    {
                        element: 
                            <label htmlFor={countId}>Point {id}</label>, 
                    },
                    {
                        element: 
                            <LabeledInput
                                id={countId}
                                type="number"
                                title={useShortTitles ? "Cnt" : "Count"}
                                placeholder="Enter count"
                                value={point?.count ?? 0}
                                textColor='black'
                                onChange={(e) => handleChange(id, 'count', Number(e.target.value))}
                            />, 
                    },
                    {
                        element: 
                            <LabeledInput
                                id={expectationId}
                                type="number"
                                title={useShortTitles ? "Exp" : "Expectation"}
                                placeholder="Enter expectation"
                                value={point?.expectation ?? 0}
                                textColor='black'
                                onChange={(e) => handleChange(id, 'expectation', Number(e.target.value))}
                            />, 
                    },
                    {
                        element: 
                            <LabeledInput
                                id={expectationId}
                                type="number"
                                title={useShortTitles ? "Exp" : "Expectation"}
                                placeholder="Enter expectation"
                                value={point?.expectation ?? 0}
                                textColor='black'
                                onChange={(e) => handleChange(id, 'expectation', Number(e.target.value))}
                            />
                    },
                    {
                        element: 
                            <LabeledInput
                                id={volatilityId}
                                type="number"
                                title={useShortTitles ? "Vol" : "Volatility"}
                                placeholder="Enter volatility"
                                value={point?.volatility ?? 0}
                                textColor='black'
                                onChange={(e) => handleChange(id, 'volatility', Number(e.target.value))}
                            />, 
                    }
                ]}
                columns={5}
                rows={1}            
            />
        </div>
    );
};

export default PointInputGroup;