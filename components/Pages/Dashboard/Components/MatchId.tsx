import { EventTypes, GsiMatchIdMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";

export default function MatchId(): ReactElement | null {
    const {value: matchId} = useTetherMessageListener<GsiMatchIdMessage>(EventTypes.gsi_match_id) || {value: null};

    if(matchId) {
        return <div>Match ID: {matchId}</div>;
    }

    return null;
}