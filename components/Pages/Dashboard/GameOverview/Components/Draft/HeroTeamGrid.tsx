import { EventTypes, GsiDraftMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";
import BannedHeroes from "./BannedHeroes";
import PickedHeroes from "./PickedHeroes";

export default function HeroTeamGrid(): ReactElement | null {
    const {value: draft} = useTetherMessageListener<GsiDraftMessage>(EventTypes.gsi_draft);

    if(draft) {
        return <>
            <BannedHeroes data={draft.team2}/>
            <BannedHeroes data={draft.team3}/>

            <PickedHeroes data={draft.team2} />
            <PickedHeroes data={draft.team3} />
        </>;
    }

    return null;
}