import { EventTypes, GsiDraftMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement, useCallback, useState } from "react";
import BannedHeroes from "./BannedHeroes";
import PickedHeroes from "./PickedHeroes";

export default function HeroTeamGrid(): ReactElement | null {
    const {value: draft} = useTetherMessageListener<GsiDraftMessage>(EventTypes.gsi_draft);
    const [overlayActive, setOverlayActive] = useState(false);
    const onShowOverlay = useCallback(() => {
        setOverlayActive(true);
        setTimeout(() => setOverlayActive(false), 10000);
    }, []);

    if(draft) {
        return <>
            <BannedHeroes data={draft.team2}/>
            <BannedHeroes data={draft.team3}/>

            <PickedHeroes data={draft.team2} overlayActive={overlayActive} onShowOverlay={onShowOverlay}/>
            <PickedHeroes data={draft.team3} overlayActive={overlayActive} onShowOverlay={onShowOverlay} />
        </>;
    }

    return null;
}