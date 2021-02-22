import { EventTypes, GsiActivityMessage, GsiGameStateMessage, useTetherMessageListener } from "@esportlayers/io";

import DashboardHeader from "./DashboardHeader";
import GameOverview from "./GameOverview/GameOverview";
import IconLoader from "../../Ui/loader/IconLoader";
import PlayerGameOverview from "./PlayerGameOverview/PlayerGameOverview";
import { ReactElement } from "react";

export default function PageView(): ReactElement {
    const {value: state} = useTetherMessageListener<GsiGameStateMessage>(EventTypes.gsi_game_state) || {value: null};
    const {value: activity} = useTetherMessageListener<GsiActivityMessage>(EventTypes.gsi_game_activity) || {value: null};
    
    return <div className={'content'}>
        <DashboardHeader />

        {!state && <div className={'loader'}>
            <IconLoader />
            <div className={'label'}>
                Waiting for Game...
            </div>
        </div>}

        {state && activity && activity === 'playing' && <PlayerGameOverview />}
        {state && activity && activity === 'observing' && <GameOverview />}

        <style jsx>{`
            .content {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                align-items: stretch;
            }
            .loader {
                height: 200px;
                width: 200px;
                margin: -1rem auto 0 auto;
                align-self: center;
                text-align: center;
            }    

            .label {
                margin-top: 1rem;
            }
        `}</style>
    </div>
}