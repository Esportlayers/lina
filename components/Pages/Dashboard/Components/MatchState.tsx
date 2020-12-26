import { GsiGameStateMessage, isGsiGameStateMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";

const stateMessage = {
    "DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD": 'Waiting for players',
    "DOTA_GAMERULES_STATE_HERO_SELECTION": 'Hero selection',
    "DOTA_GAMERULES_STATE_STRATEGY_TIME": 'Strategy time',
    "DOTA_GAMERULES_STATE_TEAM_SHOWCASE": 'Team showcase',
    "DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD": 'Loading map',
    "DOTA_GAMERULES_STATE_PRE_GAME": 'Pre game',
    "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS": 'Live game',
    "DOTA_GAMERULES_STATE_POST_GAME": 'Post game'
};

export default function MatchState(): ReactElement | null {
    const {value: state} = useTetherMessageListener<GsiGameStateMessage>(isGsiGameStateMessage) || {value: null};

    if(state) {
        return <div>Match State: {stateMessage[state]}</div>;
    }

    return null;
}