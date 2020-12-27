import { EventTypes, GsiActivityMessage, GsiGameStateMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";
import IconLoader from "../../Ui/loader/IconLoader";
import DashboardHeader from "./DashboardHeader";
import GameOverview from "./GameOverview/GameOverview";
import PlayerGameOverview from "./PlayerGameOverview/PlayerGameOverview";

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
                padding-top: 50px;
                height: 100vh;
                width: 100vw;
                display: flex;
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