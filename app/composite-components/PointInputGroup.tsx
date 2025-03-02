import React, { useEffect, useRef, useState } from 'react';
import LabeledInput from '../components/input';
import { TPatternPoint } from '../models/types';
import './PointInputGroup.css';

interface PointInputGroupProps {
    id: number;
    point?: TPatternPoint;
    onChange?: (id: number, field: keyof TPatternPoint, value: string) => void;
    prefix?: string;
}

const PointInputGroup: React.FC<PointInputGroupProps> = ({ id, point, onChange, prefix = '' }) => {
    const [useShortTitles, setUseShortTitles] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const countId = `${prefix}count-${id}`;
    const expectationId = `${prefix}expectation-${id}`;
    const volatilityId = `${prefix}volatility-${id}`;

    const handleChange = (id: number, field: keyof TPatternPoint, value: string) => {
        if (onChange) {
            onChange(id, field, value);
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
            <label htmlFor={countId}>Point {id}</label>
            <LabeledInput
                id={countId}
                type="number"
                title={useShortTitles ? "Cnt" : "Count"}
                placeholder="Enter count"
                value={point?.count ?? 0}
                onChange={(e) => handleChange(id, 'count', e.target.value)}
            />
            <LabeledInput
                id={expectationId}
                type="number"
                title={useShortTitles ? "Exp" : "Expectation"}
                placeholder="Enter expectation"
                value={point?.expectation ?? 0}
                onChange={(e) => handleChange(id, 'expectation', e.target.value)}
            />
            <LabeledInput
                id={volatilityId}
                type="number"
                title={useShortTitles ? "Vol" : "Volatility"}
                placeholder="Enter volatility"
                value={point?.volatility ?? 0}
                onChange={(e) => handleChange(id, 'volatility', e.target.value)}
            />
        </div>
    );
};

export default PointInputGroup;