import { GsiActivityMessage, GsiMatchIdMessage, isGsiActivityMessage, isGsiMatchIdMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";
import Divider from "./Divider";

export default function Activity(): ReactElement | null {
    const {value: activity} = useTetherMessageListener<GsiActivityMessage>(isGsiActivityMessage) || {value: null};
    const {value: matchId} = useTetherMessageListener<GsiMatchIdMessage>(isGsiMatchIdMessage) || {value: null};

    if(activity) {
        return <>
            <Divider />
            <div className={'activityLabel'}>
                {activity === 'playing' && 'Player mode'}
                {activity === 'observing' && 'Observer mode'}
            </div>

            {matchId && <>
                <Divider />
                <div>Match ID: {matchId}</div>
            </>}
        </>;
    }

    return null;
}