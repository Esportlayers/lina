import { GsiMatchIdMessage, isGsiMatchIdMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";

export default function MatchId(): ReactElement | null {
    const {value: matchId} = useTetherMessageListener<GsiMatchIdMessage>(isGsiMatchIdMessage) || {value: null};

    if(matchId) {
        return <div>Match ID: {matchId}</div>;
    }

    return null;
}