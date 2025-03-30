import React, { useState } from 'react';
import SelectedTab from "../components/button";
import PointInputGroup from './PointInputGroup';
import ListBox from '../components/listbox';
import { TPatternPoint } from '../models/types';
import './styles/PointsSettingPanel.css';
import { IPattern } from '../controllers/interfaces';
import { TLocalizedFrameProps } from '../views/types';

type TSettingsFrameProps = TLocalizedFrameProps & {
    callBack() : void;
    data: IPattern;
};
function PointsSettingPanel(settingsprops: TSettingsFrameProps) {
    const [editPattern, setEditPattern] = useState(settingsprops.data.pattern);
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
            <SelectedTab title='Delete' backgroundcolor='red' onClick={() => deletePoint('points', index)} />
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
            <SelectedTab title='Delete' backgroundcolor='red' onClick={() => deletePoint('pre_points', index)} />
        </div>
    ));

    const HandlePointsChange = () => {
        settingsprops.data.save(editPattern);
        setShowMessage(true);
        setUnsavedChanges(false);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <div className="container">
            <div className='items-container'>
                <h3>Pre-Points</h3>
                <ListBox elements={PrePoints} />
                <SelectedTab title='Add Pre-Point' backgroundcolor='green' onClick={() => addNewPoint('pre_points')} />
            </div>
            <div className='items-container'>
                <h3>Points</h3>
                <ListBox elements={Points} />
                <SelectedTab title='Add Point' backgroundcolor='green' onClick={() => addNewPoint('points')} />
            </div>
            <div className='buttons-continer'>
                <SelectedTab
                    title={unsavedChanges ? 'Save' : 'Saved'}
                    onClick={unsavedChanges ? HandlePointsChange : () => {}}
                />
                <SelectedTab title={settingsprops.getWord('back')} onClick={settingsprops.callBack} />
                {showMessage && <div className="save-message">Changes saved successfully!</div>}
            </div>
        </div>
    );
}

export default PointsSettingPanel;