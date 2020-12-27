import { ReactElement } from "react";
import { useAbortFetch } from "../../../../../../hooks/abortFetch";
import { getDefaultHeader } from "../../../../../../modules/middleware/Network";
import Button from "../../../../../Ui/button/Button";

interface Props {
    heroId: number;
    heroClass: string;
}


interface HeroOverview {
    index: number;
    heroId: number;
    matchCount: number;
    matchWins: number;
    pickPhaseOne: number;
    pickPhaseTwo: number;
    pickPhaseThree: number;
    banCount: number;
    banPhaseOne: number;
    banPhaseTwo: number;
    banPhaseThree: number;
    totalGamesCount: number;
}

export async function fetchHeroStats(abortController: AbortController, leagueId: string, heroId: number): Promise<HeroOverview | null> {
    const response = await fetch(process.env.API_URL + `/casting/heroStats/${leagueId}/${heroId}`, {headers: getDefaultHeader(), signal: abortController.signal});
    if(response.ok) {
        return await response.json();
    }

    return null;
}

export default function PickedHero({heroId, heroClass}: Props): ReactElement {
    const [stats] = useAbortFetch(fetchHeroStats, '7.27', heroId);
    const games = stats?.matchCount || 0;
    const wins = stats?.matchWins || 0;
    const totalGamesCount = stats?.totalGamesCount || 0;
    const winRate = games > 0 ? Math.floor(((wins) * 100) / games) : 0;
    const banRate = totalGamesCount > 0 ? Math.floor(((stats?.banCount || 0) * 100) / totalGamesCount) : 0;
    const pickRate = totalGamesCount > 0 ? Math.floor((games * 100) / totalGamesCount) : 0;

    return <div className={'entry'}>
        <video width={'100%'} loop autoPlay muted>
            <source src={process.env.API_URL + `/static/heroes/videos/${heroClass}.mp4`} type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
        </video>

        <div className={'details'}>
            <div className={'statsValue'}>
                <div className={'stats'}>
                    {wins}/{games} ({winRate}%)
                </div>
                <div className={'label'}>
                    WINRATE
                </div>
            </div>
            <div className={'statsValue'}>
                <div className={'stats'}>
                    {pickRate}%
                </div>
                <div className={'label'}>
                    PICKS
                </div>
            </div>
            <div className={'statsValue'}>
                <div className={'stats'}>
                    {banRate}%
                </div>
                <div className={'label'}>
                    BANS
                </div>
            </div>
        </div>

        <div className={'details'}>
            <Button small noDropShadow>Stats</Button>
        </div>

        <style jsx>{`
            .entry {
                border-radius: 1rem;
                overflow: hidden;
                border: 1px solid rgba(0,0,0,.2);
                box-shadow: 2px 2px 10px rgba(0,0,0,.1);
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: stretch;
            }    

            video {
                border-top-right-radius: 1rem;
                border-top-left-radius: 1rem;
                object-fit: cover;
            }

            .details {
                padding: 1.5rem 1rem 1rem 1rem;
                text-align: center;
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: .5rem;
            }

            .details + .details {
                padding-top: 0;
            }

            .label {
                font-size: .8rem;
                color: rgba(255,255,255,.6);
                margin-top: .1rem;
            }
        `}</style>
    </div>;
}