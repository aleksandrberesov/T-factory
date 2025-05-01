import React from 'react';
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

    return(
        <div id='profile-frame' className="view">
            <ListBox 
                backgroundColor='gray'
                elements={[
                    <LabelBox key='1' title='name' value={props.profile.data.user.first_name} textcolor='white'/>,
                    <LabelBox key='2' title='second name' value={props.profile.data.user.last_name} textcolor='white'/>,
                    <LabelBox key='3' title='balance' value={props.profile.data.balance} textcolor='white'/>
                ]}
            />
            <GridBox 
                backgroundColor=''
                rows={Math.ceil(cardElemets.length / 2)} 
                columns={2} 
                elements={cardElemets}
            /> 
        </div>
    );
}

export default ProfileFrame;