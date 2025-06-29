import React, { useMemo } from 'react';
import { TProfileFrameProps} from "./types";
import { TProfile } from "../models/types";
import Label from "../ui/label";
import Grid from '../ui/grid';
import List from '../ui/list';
import IncomeCard from '../widgets/IncomeCard';

const ProfileFrame: React.FC<TProfileFrameProps> = (props) => {
    const profile: TProfile = props.profile.getCurrent();
    const cardElemets = profile.cards.map((item) => {
        return {
            element: <IncomeCard title={item.title} description={item.description}/>
        }
    });

    const grid = useMemo(() => (
        <Grid 
            columns={1} 
            rows={10} 
            showBorders={false}
            elements={[
                {
                    element:
                        <List 
                            backgroundColor='gray'
                            elements={[
                                <Label key='0' title='tgID' value={profile.id} textColor='white'/>,
                                <Label key='1' title='name' value={profile.user.first_name} textColor='white'/>,
                                <Label key='2' title='second name' value={profile.user.last_name} textColor='white'/>,
                                <Label key='3' title='balance' value={profile.balance} textColor='white'/>,
                                <Label key='4' title='level' value={profile.level} textColor='white'/>,
                            ]}
                        />,
                    column: 1, row: 1, rowSpan: 1,
                },
                {
                    element:
                        <Grid 
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