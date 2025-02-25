import React from 'react';
import LabeledInput from '../components/input';
import { TPatternPoint } from '../models/types';

interface PointInputGroupProps {
    id: number;
    point: TPatternPoint;
    onChange: (id: number, field: keyof TPatternPoint, value: string) => void;
    prefix?: string;
}

const PointInputGroup: React.FC<PointInputGroupProps> = ({ id, point, onChange, prefix = '' }) => {
    const countId = `${prefix}count-${id}`;
    const expectationId = `${prefix}expectation-${id}`;
    const volatilityId = `${prefix}volatility-${id}`;

    return (
        <div key={id} className="input-group">
            <label htmlFor={countId}>Point {id + 1}</label>
            <LabeledInput
                id={countId}
                type="number"
                title="Count"
                placeholder="Enter count"
                value={point.count}
                onChange={(e) => onChange(id, 'count', e.target.value)}
            />
            <LabeledInput
                id={expectationId}
                type="number"
                title="Expectation"
                placeholder="Enter expectation"
                value={point.expectation}
                onChange={(e) => onChange(id, 'expectation', e.target.value)}
            />
            <LabeledInput
                id={volatilityId}
                type="number"
                title="Volatility"
                placeholder="Enter volatility"
                value={point.volatility}
                onChange={(e) => onChange(id, 'volatility', e.target.value)}
            />
        </div>
    );
};

export default PointInputGroup;