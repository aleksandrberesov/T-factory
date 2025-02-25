import React, { useState } from 'react';
import SelectedTab from "../components/button";
import PointInputGroup from '../composite-components/PointInputGroup';
import ListBox from '../components/listbox';
import { TPatternPoint } from '../models/types';
import { TSettingsFrameProps } from "./types";
import './frame.settings.css';

function SettingsFrame(settingsprops: TSettingsFrameProps) {
    const [editPattern, setEditPattern] = useState(settingsprops.data.pattern);

    const onChange = (id: number, field: keyof TPatternPoint, value: string) => {
        const updatedPattern = { ...editPattern };
        updatedPattern.points[id][field] = parseFloat(value);
        setEditPattern(updatedPattern);
    };

    const onChangePrePoints = (id: number, field: keyof TPatternPoint, value: string) => {
        const updatedPattern = { ...editPattern };
        updatedPattern.pre_points[id][field] = parseFloat(value);
        setEditPattern(updatedPattern);
    };

    const Points = editPattern.points.map((item, index) => ({
        id: index,
        element: (
            <PointInputGroup
                key={index}
                id={index}
                point={item}
                onChange={onChange}
            />
        )
    }));

    const PrePoints = editPattern.pre_points.map((item, index) => ({
        id: index,
        element: (
            <PointInputGroup
                key={index}
                id={index}
                point={item}
                onChange={onChangePrePoints}
                prefix="pre-"
            />
        )
    }));

    const HandlePointsChange = () => {
        settingsprops.data.save(editPattern);
    };

    return (
        <div className="h-screen w-screen bg-transparent gap-y-10">
            <div className='grid-flow-row gap-2 m-2 bg-gray-500'>
                <h3>Pre-Points</h3>
                <ListBox elements={PrePoints} />
                <h3>Points</h3>
                <ListBox elements={Points} />
                <SelectedTab title='Save' /*"Back" */ onclick={HandlePointsChange} />
                <SelectedTab title={settingsprops.getWord(19)} /*"Back" */ onclick={settingsprops.callBack} />
            </div>
        </div>
    );
}

export default SettingsFrame;