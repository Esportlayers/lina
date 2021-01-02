import { useVoteValue } from "@esportlayers/io";
import { ReactElement } from "react";
import AnimatedNumber from "animated-number-react";

export default function ChatParticipations(): ReactElement | null {
    const [state] = useVoteValue();
    if(state) {
        return <div className={'participants'}>
            <div className={'icon'}>
                <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M461.29 288H224V50.7101C224 41.1601 215.61 33.3201 206.16 34.6501C87.08 51.4701 -3.96001 155.43 0.129994 280.07C4.19999 404.1 107.91 507.8 231.93 511.87C356.57 515.96 460.53 424.92 477.35 305.84C478.68 296.39 470.83 288 461.29 288V288ZM288.8 0.0400664C279.68 -0.589934 272 7.10007 272 16.2401V240H495.77C504.91 240 512.59 232.31 511.97 223.2C503.72 103.74 408.26 8.28007 288.8 0.0400664Z" fill="#c2c2c2"/>
                </svg>
            </div>

            <div className={'participations'}>
                <AnimatedNumber value={Math.floor((state.totalVotesCount * 100) / state.chatterCounts)} formatValue={(value) => value.toFixed(0)}/>%
            </div>

            <style jsx>{`
                .participants {
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

                .participations, .participations :global(span) {
                    font-family: monospace;
                }
            `}</style>
        </div>
    }
    return null;
}