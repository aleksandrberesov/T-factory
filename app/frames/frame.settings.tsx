import React, { useState, useEffect } from 'react';
import SelectedTab from "../components/button";
import PointInputGroup from '../composite-components/PointInputGroup';
import ListBox from '../components/listbox';
import { TPatternPoint } from '../models/types';
import { TSettingsFrameProps } from "./types";
import './frame.settings.css';

function SettingsFrame(settingsprops: TSettingsFrameProps) {
    const [editPattern, setEditPattern] = useState(settingsprops.data.pattern);
    const [showMessage, setShowMessage] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const onChange = (id: number, field: keyof TPatternPoint, value: string) => {
        const updatedPattern = { ...editPattern };
        updatedPattern.points[id][field] = parseFloat(value);
        setEditPattern(updatedPattern);
        setUnsavedChanges(true);
    };

    const onChangePrePoints = (id: number, field: keyof TPatternPoint, value: string) => {
        const updatedPattern = { ...editPattern };
        updatedPattern.pre_points[id][field] = parseFloat(value);
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

    const Points = editPattern.points.map((item, index) => ({
        id: index,
        element: (
            <div key={index} className="point-item">
                <PointInputGroup
                    id={index}
                    point={item}
                    onChange={onChange}
                />
                <SelectedTab title='Delete' backgroundcolor='red' onclick={() => deletePoint('points', index)} />
            </div>
        )
    }));

    const PrePoints = editPattern.pre_points.map((item, index) => ({
        id: index,
        element: (
            <div key={index} className="point-item">
                <PointInputGroup
                    id={index}
                    point={item}
                    onChange={onChangePrePoints}
                    prefix="pre-"
                />
                <SelectedTab title='Delete' backgroundcolor='red' onclick={() => deletePoint('pre_points', index)} />
            </div>
        )
    }));

    const HandlePointsChange = () => {
        settingsprops.data.save(editPattern);
        setShowMessage(true);
        setUnsavedChanges(false);
        setTimeout(() => setShowMessage(false), 3000); // Hide message after 3 seconds
    };

    return (
        <div className="h-screen w-screen bg-transparent gap-y-10">
            <div className='container m-2 bg-gray-500'>
                <div className='column'>
                    <h3>Pre-Points</h3>
                    <ListBox elements={PrePoints} />
                    <SelectedTab title='Add Pre-Point' backgroundcolor='green' onclick={() => addNewPoint('pre_points')} />
                </div>
                <div className='column'>
                    <h3>Points</h3>
                    <ListBox elements={Points} />
                    <SelectedTab title='Add Point' backgroundcolor='green' onclick={() => addNewPoint('points')} />
                </div>
            </div>
            <div className='m-2 bg-gray-500'>
                <SelectedTab
                    title={unsavedChanges ? 'Save' : 'Saved'}
                    onclick={unsavedChanges ? HandlePointsChange : () => {}}
                />
                <SelectedTab title={settingsprops.getWord(19)} onclick={settingsprops.callBack} />
                {showMessage && <div className="save-message">Changes saved successfully!</div>}
            </div>
         </div>
    );
}

export default SettingsFrame;