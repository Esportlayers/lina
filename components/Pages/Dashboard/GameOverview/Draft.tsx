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

            @media screen and (max-width: 1310px) {
                .draftGrid {
                    grid-column-gap: 4rem;
                }
            }

            @media screen and (max-width: 1240px) {
                .draftGrid {
                    font-size: .9rem;
                }
            }

            @media screen and (max-width: 1000px) {
                .draftGrid {
                    grid-template-columns:1fr;
                    grid-row-gap: 2rem;
                }
            }
        `}</style>
    </div>;
}