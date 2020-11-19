import { ReactElement } from "react";
import NudgeFromBottom from "../Ui/motion/NudgeFromBottom";
import VoteSystem from "./TileSvgs/VoteSystem";

const options = [
    {
        icon: <VoteSystem />,
        title: 'Vote system',
        description: 'Viewers can vote on your game result',
    }, {
        icon: <VoteSystem />,
        title: 'W/L Overlay',
        description: 'Counts your wins and losses',
    }, {
        icon: <VoteSystem />,
        title: 'Anti snipe minimap',
        description: 'Overlay for your minimap to avoid snipers',
    }, {
        icon: <VoteSystem />,
        title: 'Roshan timer',
        description: 'Simple timer to show when roshan does respawn',
    }, {
        icon: <VoteSystem />,
        title: 'Draft stats',
        description: 'Statistics for hero picks',
    }, {
        icon: <VoteSystem />,
        title: 'Hero stats',
        description: 'Live statistics by heroes in your games',
    }
]
export default function Dashboard(): ReactElement {
    return <div className={'container'}>
        <div className={'grid'}>
            {options.map(({title, icon, description}, idx) => <NudgeFromBottom delay={.05 * idx}>
                <div key={title}>
                    <div className={'icon'}>{icon}</div>
                    <h4>{title}</h4>
                    <div className={'info'}>{description}</div>
                </div>
            </NudgeFromBottom>)}
        </div>

        <style jsx>{`
            .container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                min-height: 100vh;
                align-items: center;
            } 

            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 4rem;
            }   

            .icon {
                margin-bottom: 2rem;
                text-align: center;
            }

            h4 {
                margin: 0;
                text-align: center;
            }

            .info {
                font-size: .9rem;
                color: rgba(255, 255, 255, .85);
                text-align: center;
            }
        `}</style>
    </div>;
}