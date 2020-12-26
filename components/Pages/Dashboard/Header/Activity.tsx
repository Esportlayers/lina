import { GsiActivityMessage, isGsiActivityMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";
import Divider from "./Divider";

export default function Activity(): ReactElement | null {
    const {value: activity} = useTetherMessageListener<GsiActivityMessage>(isGsiActivityMessage) || {value: null};

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