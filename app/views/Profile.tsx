import React, { useMemo } from 'react';
import './styles/view.css';
import { TProfileFrameProps} from "./types";
import LabelBox from "../components/label";
import IncomeCard from '../widgets/IncomeCard';
import GridBox from '../components/gridbox';
import ListBox from '../components/listbox';

const ProfileFrame: React.FC<TProfileFrameProps> = (props) => {
    const cardElemets = props.profile.data.cards.map((item) => {
        return {
            element: <IncomeCard title={item.title} description={item.description}/>
        }
    });

    const grid = useMemo(() => (
        <GridBox 
            columns={1} 
            rows={10} 
            showBorders={false}
            elements={[
                {
                    element:
                        <ListBox 
                            backgroundColor='gray'
                            elements={[
                                <LabelBox key='0' title='tgID' value={props.profile.data.id} textcolor='white'/>,
                                <LabelBox key='1' title='name' value={props.profile.data.user.first_name} textcolor='white'/>,
                                <LabelBox key='2' title='second name' value={props.profile.data.user.last_name} textcolor='white'/>,
                                <LabelBox key='3' title='balance' value={props.profile.data.balance} textcolor='white'/>,
                                <LabelBox key='4' title='level' value={props.profile.data.level} textcolor='white'/>,
                            ]}
                        />,
                    column: 1, row: 1, rowSpan: 1,
                },
                {
                    element:
                        <GridBox 
                            backgroundColor=''
                            rows={Math.ceil(cardElemets.length / 2)} 
                            columns={2} 
                            elements={cardElemets}
                        />,
                    column: 1, row: 2, rowSpan: 8, 
                }, 
            ]}
        />
    ), []);

    return(
        <div id='profile-frame' className="view bg-slate-100">
            {grid}
        </div>
    );
}

export default ProfileFrame;