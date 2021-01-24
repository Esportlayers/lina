import { EventTypes, GsiPlayersStateMessage, useTetherMessageListener } from "@esportlayers/io";
import classNames from "classnames";
import { ReactElement, useEffect, useMemo, useState } from "react";
import AnimatedNumber from "animated-number-react";
import { useInterval } from "../../../../../../VoteOverlay/Status";

const formatter = (value) => value.toFixed(0);

interface Props {
    playerIndex: number;
}

export default function PlayerStatus({playerIndex}: Props): ReactElement {
    const {value: playerStates} = useTetherMessageListener<GsiPlayersStateMessage>(EventTypes.gsi_players_state) || {value: null};
    const [respawn, setRespawn] = useState(0);
    useInterval(() => respawn > 0 && setRespawn(s => --s));

    const player = useMemo(() => {
        if(playerStates && playerStates.length > 0) {
            return playerStates[playerIndex - 1];
        }
        return null;
    }, [playerIndex, playerStates]);

    useEffect(() => setRespawn(player?.respawn_seconds || 0), [player]);
    
    return <div className={classNames('playerStatus', `index-${playerIndex}`, {dead: player && !player.alive})}>
        {player && <>
            {player.alive && <>
                <div className={'health'}>
                    <div className={'progress'} style={{width: player.health_percent + '%'}} />
                </div>
                <div className={'mana'}>
                    <div className={'progress'} style={{width: player.mana_percent + '%'}} />
                </div>
            </>}
            {!player.alive && player.heroId && player.heroId !== -1 && <div className={classNames('playerDead', {canBb: player.canBuyBack})}>
                <div className={'respawn'}>
                    <AnimatedNumber value={respawn} formatValue={formatter} />
                </div>
            </div>}
        </>}

        <style jsx>{`
            .playerStatus {
            }

            .dead {
                background-color: #333;
                margin-top: -.3rem;
                position: relative;
                z-index: 2;
                transform: skew(-10deg);
            }

            .index-6.dead, .index-7.dead, .index-8.dead, .index-9.dead, .index-10.dead {
                transform: skew(10deg);
            }
            
            .health, .mana {
                height: 6px;
                width: 100%;
                box-shadow: inset 0px 0px 4px 0px rgba(0,0,0,0.5);
                position: relative;
                overflow: hidden;
            }

            .progress {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                z-index: -1;
                transition: width 120ms ease-in-out;
            }

            .health .progress {
                background-color: #1bcf2d;
            }

            .mana .progress {
                background-color: #279be3;
            }

            .playerDead {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .7rem;
                font-weight: bold;
                height: 1rem;
            }

            .canBb {
                box-shadow: inset 0 0 5px 1px #ffd000;
            }
        `}</style>
    </div>
}