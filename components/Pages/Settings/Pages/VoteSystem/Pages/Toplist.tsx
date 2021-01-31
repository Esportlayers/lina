import Tether, { getWSUrl } from "@esportlayers/io";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { patchVoteSeason } from "../../../../../../modules/reducer/VoteSeason";
import { useCurrentUser } from "../../../../../../modules/selector/UiSelector";
import { useVoteSeasons } from "../../../../../../modules/selector/VoteSeasons";
import Button from "../../../../../Ui/button/Button";
import Input from "../../../../../Ui/input/Input";
import SeasonSelector from "../SeasonSelector";
import ToplistTable from "./Toplist/ToplistTable";

export default function Toplist(): ReactElement {
    const currentUser = useCurrentUser();
    const [season, setSeason] = useState(currentUser && currentUser.betSeasonId);
    const [filter, setFilter] = useState('');
    useEffect(() => setSeason(currentUser && currentUser.betSeasonId), [currentUser]);
    const seasons = useVoteSeasons();
    const winnerCount = useMemo(() => {
        if(seasons && season) {
            const relevantSeason = seasons.find(({id}) => id === season);
            return relevantSeason?.winnerCount || 1;
        }
        return 1;
    }, [seasons, season]);
    const dispatch = useDispatch();
    
    return <div>
        <div className={'header'}>
            <div className={'headerFilter'}>
                <SeasonSelector season={season} onChange={setSeason} />
                <div className={'searchWrapper'}>
                    <Input label={'Search'} value={filter} onChange={setFilter} />
                </div>
                <div className={'toplistEntryCount'}>
                    <Input<Number> label={'Winner Count'} value={winnerCount} type={'number'} onChange={(count) => dispatch(patchVoteSeason(season, {winnerCount: parseInt('' + count)}))}/>
                </div>    
            </div>

            <Button>Winners</Button>
        </div>

        {season && currentUser && <Tether url={getWSUrl(process.env.API_URL + '/dota-gsi/live/' + currentUser.frameApiKey)}>
            <ToplistTable seasonId={season} filter={filter} />
        </Tether>}

        <style jsx>{`
            .header, .headerFilter {
                display: flex;
                align-items: flex-start;
            }

            .header {
                justify-content: space-between;
            } 

            .searchWrapper, .toplistEntryCount {
                margin-left: 2rem;
                max-width: 20rem;
            }
        `}</style>
    </div>;
}