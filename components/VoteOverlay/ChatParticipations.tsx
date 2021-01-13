import { useVoteValue } from "@esportlayers/io";
import { ReactElement } from "react";
import AnimatedNumber from "animated-number-react";

export default function ChatParticipations(): ReactElement | null {
    const [state] = useVoteValue();
    if(state) {
        return <div className={'participants'}>
            <div className={'icon'}>
                <svg viewBox="0 0 576 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M416 160C416 71.6 322.9 0 208 0C93.1 0 0 71.6 0 160C0 194.3 14.1 225.9 38 252C24.6 282.2 2.5 306.2 2.2 306.5C0 308.8 -0.6 312.2 0.7 315.2C2 318.2 4.8 320 8 320C44.6 320 74.9 307.7 96.7 295C128.9 310.7 167 320 208 320C322.9 320 416 248.4 416 160ZM538 380C561.9 354 576 322.3 576 288C576 221.1 522.5 163.8 446.7 139.9C447.6 146.5 448 153.2 448 160C448 265.9 340.3 352 208 352C197.2 352 186.7 351.2 176.3 350.1C207.8 407.6 281.8 448 368 448C409 448 447.1 438.8 479.3 423C501.1 435.7 531.4 448 568 448C571.2 448 574.1 446.1 575.3 443.2C576.6 440.3 576 436.9 573.8 434.5C573.5 434.2 551.4 410.3 538 380Z" fill="#c2c2c2"/>
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