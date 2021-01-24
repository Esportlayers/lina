import Tether, { getWSUrl } from "@esportlayers/io";
import React, { ReactElement, useEffect, useState } from "react";
import { useCurrentUser } from "../../../../../../modules/selector/UiSelector";
import SeasonSelector from '../SeasonSelector';
import RoundsTable from "./Rounds/RoundsTable";

export default function Rounds(): ReactElement {
    const currentUser = useCurrentUser();
    const [season, setSeason] = useState(currentUser && currentUser.betSeasonId);
    useEffect(() => setSeason(currentUser && currentUser.betSeasonId), [currentUser]);

    return <div>
        <SeasonSelector season={season} onChange={setSeason} />

        {season && currentUser && <Tether url={'wss://api.streamdota.com/dota-gsi/live/81f8c9aa-ed7b-47be-8f17-9ad01cb47fff'}>
            <RoundsTable seasonId={season} />
        </Tether>}
    </div>;
}