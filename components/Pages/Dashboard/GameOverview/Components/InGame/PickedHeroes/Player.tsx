import classNames from "classnames";
import { ReactElement } from "react";
import Color from "./Color";
import HeroImage from "./HeroImage";
import PlayerStatus from "./PlayerStatus";

interface Props {
    playerIndex: number;
}

export default function Player({playerIndex}: Props): ReactElement {
    return <div className={classNames('playerState', `index-${playerIndex}`)}>
        <Color playerIndex={playerIndex} />
        <HeroImage playerIndex={playerIndex} />
        <PlayerStatus playerIndex={playerIndex} />

        <style jsx>{`
            .playerState {
                transform: skew(10deg);
                overflow: hidden;
            }    

            .index-6, .index-7, .index-8, .index-9, .index-10 {
                transform: skew(-10deg);
            }
        `}</style>
    </div>;
}