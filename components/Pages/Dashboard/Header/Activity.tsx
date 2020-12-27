import { EventTypes, GsiActivityMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";
import Divider from "./Divider";

export default function Activity(): ReactElement | null {
    const {value: activity} = useTetherMessageListener<GsiActivityMessage>(EventTypes.gsi_game_activity) || {value: null};

    if(activity) {
        return <>
            <Divider />
            <div className={'activityLabel'}>
                {activity === 'playing' && 'Player mode'}
                {activity === 'observing' && 'Observer mode'}
            </div>
        </>;
    }

    return null;
}