import Tether, { getWSUrl } from "@esportlayers/io";
import { ReactElement, useEffect, useState } from "react";
import { useCurrentUser } from "../../../../../../modules/selector/UiSelector";
import Input from "../../../../../Ui/input/Input";
import SeasonSelector from "../SeasonSelector";
import ToplistTable from "./Toplist/ToplistTable";

export default function Toplist(): ReactElement {
    const currentUser = useCurrentUser();
    const [season, setSeason] = useState(currentUser && currentUser.betSeasonId);
    const [filter, setFilter] = useState('');
    useEffect(() => setSeason(currentUser && currentUser.betSeasonId), [currentUser]);
    
    return <div>
        <div className={'header'}>
            <SeasonSelector season={season} onChange={setSeason} />
            <div className={'searchWrapper'}>
                <Input label={'Suche'} value={filter} onChange={setFilter} />
            </div>
        </div>

        {season && currentUser && <Tether url={'wss://api.streamdota.com/dota-gsi/live/81f8c9aa-ed7b-47be-8f17-9ad01cb47fff'}>
            <ToplistTable seasonId={season} filter={filter} />
        </Tether>}

        <style jsx>{`
            .header {
                display: flex;
                align-items: flex-start;
            }    

            .searchWrapper {
                margin-left: 2rem;
                max-width: 20rem;
            }
        `}</style>
    </div>;
}