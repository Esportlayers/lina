import { useVoteValue } from "@esportlayers/io";
import AnimatedNumber from "animated-number-react";
import { ReactElement } from "react";

export default function Distribution(): ReactElement | null {
    const [state] = useVoteValue();

    if(state) {
        return <div className={'distribution'}>
            <div className={'icon'}>
                <svg viewBox="0 0 640 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M96 464V496C96 504.84 103.16 512 112 512H336C344.84 512 352 504.84 352 496V153.25C356.56 151.25 360.92 148.9 364.99 146.13L507.04 193.76C515.42 196.57 524.49 192.05 527.3 183.68L537.47 153.34C540.28 144.96 535.76 135.89 527.39 133.08L398.99 90.0299C399.41 86.7099 400 83.4299 400 79.9999C400 35.8199 364.18 -0.00012108 320 -0.00012108C290.31 -0.00012108 264.7 16.3599 250.89 40.3699L132.96 0.829879C124.58 -1.98012 115.51 2.53988 112.7 10.9099L102.53 41.2499C99.72 49.6299 104.24 58.6999 112.61 61.5099L244.61 105.77C251.89 127.02 267.57 144.31 287.99 153.24V448H112C103.16 448 96 455.16 96 464ZM0 304C0 348.18 57.31 384 128 384C198.69 384 256 348.18 256 304H255.98C255.98 288.33 258.06 296.75 170.93 122.49C153.25 87.1299 102.71 87.1999 85.06 122.49C-1.32 295.27 0.02 287.82 0.02 304H0ZM56 288L128 144L200 288H56ZM384.02 432H384C384 476.18 441.31 512 512 512C582.69 512 640 476.18 640 432H639.98C639.98 416.33 642.06 424.75 554.93 250.49C537.25 215.13 486.71 215.2 469.06 250.49C382.68 423.27 384.02 415.82 384.02 432V432ZM440 416L512 272L584 416H440Z" fill="#c2c2c2"/>
                </svg>
            </div>

            <div className={'votings'}>
                <AnimatedNumber value={state.teamACount} formatValue={(value) => value.toFixed(0)}/>
                <div className={'slider'}>
                    <div className={'progress'} style={{height: Math.floor((state.teamACount * 100) / state.totalVotesCount) + '%'}}/>
                </div>
                <AnimatedNumber value={state.teamBCount} formatValue={(value) => value.toFixed(0)}/>
            </div>

            <style jsx>{`
                .distribution {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }  

                .icon {
                    height: 3rem;
                    width: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }  

                .icon :global(svg) {
                    width: 100%;
                }

                .votings, .votings :global(span) {
                    font-family: monospace;
                }

                .votings {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: .5rem 0;
                }

                .slider {
                    min-height: 15vh;
                    border: 2px solid #c2c2c2;
                    width: 1rem;
                    border-radius: .5rem;
                    margin: .5rem 0;
                    position: relative;
                }

                .progress {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    background-color: #c2c2c2;
                }
            `}</style>
        </div>;
    }

    return null;
}