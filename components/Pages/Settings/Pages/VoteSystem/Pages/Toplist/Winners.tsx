import classNames from "classnames";
import { ReactElement } from "react";
import { useVoteSeason } from "../../../../../../../modules/selector/VoteSeasons";
import { useVoteSeasonToplist } from "../../../../../../../modules/selector/VoteSeasonToplist";
import Sparkles from 'react-sparkle'
import RandomWinner from "./RandomWinner";

interface Props {
    onClose: () => void;
    seasonId: number;
}

export default function Winners({onClose, seasonId}: Props): ReactElement {
    const season = useVoteSeason(seasonId);
    const toplist = useVoteSeasonToplist(seasonId);
    const topWinner = toplist.slice(0, season?.winnerCount || 0);

    return <div className={'winners'}>
        <div className={'close'} onClick={onClose}>
            <svg width="30" viewBox="0 0 412 418" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M252.819 209.175L386.516 75.4786L414.087 47.9075C418.154 43.8403 418.154 37.2311 414.087 33.1639L384.586 3.66355C380.519 -0.403667 373.91 -0.403667 369.843 3.66355L208.575 164.931L47.3074 3.65051C43.2402 -0.416706 36.631 -0.416706 32.5638 3.65051L3.05041 33.1509C-1.0168 37.2181 -1.0168 43.8273 3.05041 47.8945L164.331 209.175L3.05041 370.443C-1.0168 374.51 -1.0168 381.119 3.05041 385.187L32.5507 414.687C36.618 418.754 43.2272 418.754 47.2944 414.687L208.575 253.419L342.272 387.116L369.843 414.687C373.91 418.754 380.519 418.754 384.586 414.687L414.087 385.187C418.154 381.119 418.154 374.51 414.087 370.443L252.819 209.175Z" fill="white"/>
            </svg>
        </div>

        <h1>
            Winners of <span className={'highlight'}>{season?.name || ''}</span>
        </h1>

        <div className={'grid'}>
            <div className={'fixedWinner'}>
                {topWinner.map(({name}, idx) => <div className={classNames('entry', `rank-${idx + 1}`)} key={idx}>
                    <span className={'counter'}>{idx + 1}</span>. {name}
                </div>)}
                <Sparkles color={'white'} flicker={false} minSize={7} maxSize={12} count={20} fadeOutSpeed={20} fadeInSpeed={10}/>
            </div>

            <div className={'randomWinner'}>
                <RandomWinner seasonId={seasonId} />
            </div>
        </div>

        <style jsx>{`
            .winners {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--anthrazit);
                padding: 2rem 5rem;
                display: flex;
                align-items: stretch;
                flex-direction: column;
                height: 100vh;
            }    

            h1 {
                margin-top: 0;
                font-size: 3.5rem;
                position: relative;
                margin-bottom: 4rem;
                flex-shrink: 0;
            }

            h1::before {
                bottom: -2rem;
                height: .5rem;
                width: 15rem;
                background-color: var(--secondary-accent);
                position: absolute;
                left: 0;
                content: ' ';
            }

            .highlight {
                color: var(--secondary-accent);
            }

            .grid {
                display: grid;
                grid-gap: 5rem;
                grid-template-columns: 1fr 1fr;
                flex-grow: 1;
                height: calc(100vh - 66px - 6rem);
                align-items: center;
            } 

            .fixedWinner {
                font-size: 3rem;
                color: var(--primary-accent);
                font-weight: bold;
                margin: 5rem 0;
                position: relative;
            }

            .counter {
                font-feature-settings: "tnum";
            }

            .entry {
                margin-bottom: 3rem;
            }

            .entry.rank-1 {
                font-size:4rem;
            }

            .entry.rank-2 {
                font-size:3.5rem;
            }

            .entry:last {
                margin-bottom: 0;
            }

            .randomWinner {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5rem 0;
            }

            .close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                cursor: pointer;
                transition: scale 120ms ease-in-out;
            }
            .close:hover {
                transform: scale(1.05);
            }
        `}</style>
    </div>;
}