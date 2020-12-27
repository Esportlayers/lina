import { EventTypes, GsiMatchIdMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";
import DraftTeams from "./Components/Draft/DraftTeams";
import HeroTeamGrid from "./Components/Draft/HeroTeamGrid";

export default function Draft(): ReactElement {
    const {value: matchId} = useTetherMessageListener<GsiMatchIdMessage>(EventTypes.gsi_match_id) || {value: null};

    return <div className={'draftGrid'}>
        {matchId && <DraftTeams matchId={+matchId} />}
        <HeroTeamGrid />

        <style jsx>{`
            .draftGrid {
                display: grid;
                grid-template-columns: .5fr .5fr;
                grid-column-gap: 8rem;
                grid-row-gap: 2rem;
                align-items: center;
                padding: 2rem 0;
            }    
        `}</style>
    </div>;
}