import { ReactElement } from "react";
import DeathCounter from "./PickedHeroes/DeathCounter";
import GameTime from "./PickedHeroes/GameTime";
import Player from "./PickedHeroes/Player";

export default function HerosTopBar(): ReactElement {
    return <div className={'topBar'}>
        <div></div>
        <Player playerIndex={1} />
        <Player playerIndex={2} />
        <Player playerIndex={3} />
        <Player playerIndex={4} />
        <Player playerIndex={5} />
        <DeathCounter />
        <GameTime />
        <DeathCounter dire />
        <Player playerIndex={6} />
        <Player playerIndex={7} />
        <Player playerIndex={8} />
        <Player playerIndex={9} />
        <Player playerIndex={10} />

        <style jsx>{`
            .topBar {
                width: 100%;
                margin: -1.25rem auto 4rem auto;
                display: grid;
                grid-template-columns: 0 .75fr .75fr .75fr .75fr .75fr  1fr 1.1fr 1fr .75fr .75fr .75fr .75fr .75fr  0; 
                align-items: stretch;
                max-width: 1500px;
                height: 4rem;
            }    

            div {
                text-align: center;
            }
        `}</style>
    </div>
}