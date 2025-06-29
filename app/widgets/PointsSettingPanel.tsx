import React, { useState } from 'react';
import Button from "../ui/button";
import PointInputGroup from './PointInputGroup';
import List from '../ui/list';
import { TPatternPoint } from '../models/types';
import './styles/PointsSettingPanel.css';
import { TSettingsWindowProps } from './types';

function PointsSettingPanel(props: TSettingsWindowProps) {
    const [editPattern, setEditPattern] = useState(props.data.pattern);
    const [showMessage, setShowMessage] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const onChange = (id: number, field: keyof TPatternPoint, value: number) => {
        const updatedPattern = { ...editPattern };
        updatedPattern.points[id][field] = value;
        setEditPattern(updatedPattern);
        setUnsavedChanges(true);
    };

    const onChangePrePoints = (id: number, field: keyof TPatternPoint, value: number) => {
        const updatedPattern = { ...editPattern };
        updatedPattern.pre_points[id][field] = value;
        setEditPattern(updatedPattern);
        setUnsavedChanges(true);
    };

    const addNewPoint = (type: 'points' | 'pre_points') => {
        const newPoint: TPatternPoint = { count: 0, expectation: 0, volatility: 0 };
        const updatedPattern = { ...editPattern, [type]: [...editPattern[type], newPoint] };
        setEditPattern(updatedPattern);
        setUnsavedChanges(true);
    };

    const deletePoint = (type: 'points' | 'pre_points', id: number) => {
        const updatedPattern = { ...editPattern, [type]: editPattern[type].filter((_, index) => index !== id) };
        setEditPattern(updatedPattern);
        setUnsavedChanges(true);
    };

    const Points: React.JSX.Element[] = editPattern.points.map((item, index) => (
        <div key={index} className="point-item">
            <PointInputGroup
                id={index}
                point={item}
                onChange={onChange}
            />
            <Button title='Delete' backgroundColor='red' onClick={() => deletePoint('points', index)} />
        </div>
    ));

    const PrePoints: React.JSX.Element[] = editPattern.pre_points.map((item, index) => (
        <div key={index} className="point-item">
            <PointInputGroup
                id={index}
                point={item}
                onChange={onChangePrePoints}
                prefix="pre-"
            />
            <Button title='Delete' backgroundColor='red' onClick={() => deletePoint('pre_points', index)} />
        </div>
    ));

    const HandlePointsChange = () => {
        props.data.save(editPattern);
        setShowMessage(true);
        setUnsavedChanges(false);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <div className="container">
            <div className='items-container'>
                <h3 className="heading">Pre-Points</h3>
                <List elements={PrePoints} />
                <Button title='Add Pre-Point' backgroundColor='green' onClick={() => addNewPoint('pre_points')} />
            </div>
            <div className='items-container'>
                <h3 className="heading">Points</h3>
                <List elements={Points} />
                <Button title='Add Point' backgroundColor='green' onClick={() => addNewPoint('points')} />
            </div>
            <div className='buttons-continer'>
                <Button
                    title={unsavedChanges ? 'Save' : 'Saved'}
                    onClick={unsavedChanges ? HandlePointsChange : () => {}}
                />
                <Button title={props.localizer.dictionary.getWord('back')} onClick={props.callBack} />
                {showMessage && <div className="save-message">Changes saved successfully!</div>}
            </div>
        </div>
    );
}

export default PointsSettingPanel;