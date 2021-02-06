import { ReactElement } from "react";
import ActiveVoting from "../../../../Dashboard/Header/ActiveVoting";
import CurrentSeason from "./General/CurrentSeason";
import StreamDelay from "./General/StreamDelay";
import TeamNames from "./General/TeamNames";
import VoteDuration from "./General/VoteDuration";

export default function General(): ReactElement {
    return <div>
        <div className={'activeVoting'}>
            <ActiveVoting noDivider/>
        </div>
        <CurrentSeason />
        <TeamNames />
        <StreamDelay />
        <VoteDuration />

        <style jsx>{`
            .activeVoting {
                display: grid;
                grid-template-columns: max-content max-content;
                grid-column-gap: 2rem;
                margin-bottom: 3rem;
                height: 100%;
            }    
        `}</style>
    </div>;
}