import classNames from "classnames";
import { ReactElement, useState } from "react";
import { useCurrentUser } from "../../../../../../modules/selector/UiSelector";
import { useVoteSeasonStats } from "../../../../../../modules/selector/VoteSeasonStats";
import SeasonSelector from "../SeasonSelector";
import RoundsDataChart from "./Analytics/RoundsDataChart";
import RoundsDataLegend from "./Analytics/RoundsDataLegend";
import Value from "./Analytics/Value";

export default function Analytics(): ReactElement {
    const currentUser = useCurrentUser();
    const [season, setSeason] = useState(currentUser && currentUser.betSeasonId);
    const [compareSeason, setCompareSeason] = useState(null);
    const stats = useVoteSeasonStats(season);
    const compareStats = useVoteSeasonStats(compareSeason);

    return <div>
        <div className={'season'}>
            <SeasonSelector season={season} onChange={setSeason} />
            &nbsp;&nbsp;&nbsp;
            <SeasonSelector secondary nullable season={compareSeason} onChange={setCompareSeason} label={'Compare Season'} />
        </div>

        <div className={'analyticsGrid'}>
            <div className={'chart'}>
                <RoundsDataChart roundsData={stats?.roundsData || []} compareRoundsData={compareStats?.roundsData || []} />
                <RoundsDataLegend comparing={!!compareSeason}/>
            </div>

            <div className={classNames('totalRounds', {noCompare: !compareSeason})}>
                <Value label={'Total rounds'} value={stats?.rounds || 0} type={'primary'}/>
            </div>

            {compareSeason && <div className={'totalRoundsCompare'}>
                <Value label={'Compared total rounds'} value={compareStats?.rounds || 0} type={'secondary'}/>
            </div>}

            <div className={classNames('uniqueEntrants', {noCompare: !compareSeason})}>
                <Value label={'unique entrants'} value={stats?.uniqueVoters || 0} type={'primary'}/>
            </div>

            {compareSeason && <div className={'comparedUniqueEntrants'}>
                <Value label={'Compared unique entrants'} value={compareStats?.uniqueVoters || 0} type={'secondary'}/>
            </div>}


            <div className={classNames('totalParticipants', {noCompare: !compareSeason})}>
                <Value label={'Total votes'} value={stats?.votes || 0} type={'primary'}/>
            </div>

            {compareSeason && <div className={'totalParticipantsCompare'}>
                <Value label={'compared Total votes'} value={compareStats?.votes || 0} type={'secondary'}/>
            </div>}

            <div className={'spacer'} />
            
            <div>
                <Value label={'Correct votes'} value={stats?.votes > 0 && Math.floor(stats?.correct * 100 / stats?.votes) || 0} type={'primary'} isPercent/>
            </div>
            
            <div>
                <Value label={'Min Chatters entrants'} value={stats?.chatParticipation.min || 0} type={'primary'} isPercent/>
            </div>
            
            <div>
                <Value label={'Avg Chatters entrants'} value={stats?.chatParticipation.avg || 0} type={'primary'} isPercent/>
            </div>
            
            <div>
                <Value label={'Max Chatters entrants'} value={stats?.chatParticipation.max || 0} type={'primary'} isPercent/>
            </div>


            {compareSeason && <>
                <div>
                    <Value label={'Compared correct votes'} value={compareStats?.votes > 0 && Math.floor(compareStats?.correct * 100 / compareStats?.votes) || 0} type={'secondary'} isPercent/>
                </div>
                
                <div>
                    <Value label={'compared Min Chatters entrants'} value={stats?.chatParticipation.min || 0} type={'secondary'} isPercent/>
                </div>
                
                <div>
                    <Value label={'compared Avg Chatters entrants'} value={compareStats?.chatParticipation.avg || 0} type={'secondary'} isPercent/>
                </div>
                
                <div>
                    <Value label={'compared Max Chatters entrants'} value={compareStats?.chatParticipation.max || 0} type={'secondary'} isPercent/>
                </div>
            </>}
        </div>

        <style jsx>{`
            .season {
                display: flex;
                align-items: center;
            }   

            .analyticsGrid {
                padding: 2rem;
                width: 100%;
                display: grid;
                grid-template-columns: .25fr .25fr .25fr .25fr;
                grid-gap: 2rem;
                grid-row-gap: 3rem;
            } 

            .chart {
                grid-column: 1 / 3;
                grid-row: 1 / 4;
            }

            .totalRounds {
                grid-column: 3 / 4;
                grid-row: 1 / 2;
            }

            .noCompare.totalRounds {
                grid-column: 3 / 5;
            }

            .totalRoundsCompare {
                grid-column: 4 / 5;
                grid-row: 1 / 2;
            }

            .uniqueEntrants {
                grid-column: 3 / 4;
                grid-row: 2 / 3;
            }

            .noCompare.uniqueEntrants {
                grid-column: 3 / 5;
            }

            .comparedUniqueEntrants {
                grid-column: 4 / 5;
                grid-row: 2 / 3;
            }

            .totalParticipants {
                grid-column: 3 / 4;
                grid-row: 3 / 4;
            }


            .noCompare.totalParticipants {
                grid-column: 3 / 5;
            }

            .totalParticipantsCompare {
                grid-column: 4 / 5;
                grid-row: 3 / 4;
            }

            .spacer {
                grid-column: 1 / -1;
            }
        `}</style>
    </div>;
}