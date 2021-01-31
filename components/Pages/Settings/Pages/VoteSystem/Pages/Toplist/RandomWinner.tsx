import { ReactElement, useCallback, useState } from "react";
import { v4 } from "uuid";
import { getDefaultHeader } from "../../../../../../../modules/middleware/Network";
import Button from "../../../../../../Ui/button/Button";
import Sparkles from 'react-sparkle'

interface Winner {
    count: number;
    ticket: number;
    winner: string;
    serverSeed: string;
}

interface Props {
    seasonId: number;
}

export default function RandomWinner({seasonId}: Props): ReactElement {
    const [winner, setWinner] = useState(null);
    const [clientSeed] = useState(v4());

    const drawWinner = useCallback(async () => {
        const response = await fetch(process.env.API_URL + `/betSeason/${seasonId}/provableWinner/${clientSeed}`, {headers: getDefaultHeader()});
        if(response.ok) {
            setWinner(await response.json());
        }
    }, [clientSeed]);

    return <div className={'randomWinner'}>
        {!winner && <>
            <Button big onClick={drawWinner}>Pick a random winner</Button>
            <div className={'clientSeed'}>Client Seed: {clientSeed}</div>
        </>}

        {winner && <>
            <h2>
                {winner.winner}
                <Sparkles color={'white'} flicker={false} minSize={7} maxSize={12} count={20} fadeOutSpeed={20} fadeInSpeed={10}/>
            </h2>
            <div className={'ticket'}>Ticket: {winner.ticket} / {winner.count}</div>
            <div className={'clientSeed'}>Client Seed: {clientSeed}</div>
            <div className={'serverSeed'}>Server Seed: {winner.serverSeed}</div>
        </>}

        <style jsx>{`
            .randomWinner {
                display: flex;
                align-items: center;
                flex-direction: column;
            }

            .ticket {
                font-size: 1.5rem;
                color: var(--secondary-accent);
                font-weight: bold;
            }

            .clientSeed, .serverSeed {
                font-size: 1rem;
                margin-top: 2rem;
            }

            h2 {
                position: relative;
                font-size: 4rem;
                color: var(--primary-accent);
            }
        `}</style>
    </div>;
}