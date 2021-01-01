import { BetRoundStats as VoteRoundStats } from "@streamdota/shared-types";
import { ReactElement } from "react";


export default function ParticipantCellRenderer({chatters, total}: VoteRoundStats): ReactElement {
    const chatterParticipations = Math.floor((total * 100) / chatters);
    return <>
        {total} {chatters > 0 && <>({chatterParticipations}%)</>}
    </>;
}