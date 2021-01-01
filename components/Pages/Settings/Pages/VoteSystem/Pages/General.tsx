import { ReactElement } from "react";
import CurrentSeason from "./General/CurrentSeason";
import TeamNames from "./General/TeamNames";
import VoteDuration from "./General/VoteDuration";

export default function General(): ReactElement {
    return <div>
        <CurrentSeason />
        <TeamNames />
        <VoteDuration />
    </div>;
}