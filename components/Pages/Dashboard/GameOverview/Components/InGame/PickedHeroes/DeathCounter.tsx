import { ReactElement, useMemo } from "react";
import classNames from 'classnames';
import { EventTypes, GsiPlayersStateMessage, useTetherMessageListener } from "@esportlayers/io";
import AnimatedNumber from "animated-number-react";

const formatter = (value) => value.toFixed(0);
interface Props {
    dire?: boolean;
}

export default function DeathCounter({dire}: Props): ReactElement {
    const {value: playerStates} = useTetherMessageListener<GsiPlayersStateMessage>(EventTypes.gsi_players_state) || {value: null};

    const deaths = useMemo(() => {
        if(playerStates && playerStates.length) {
            let players = dire ? playerStates.slice(0, 5) : playerStates.slice(5);
            return players.reduce((acc, {deaths}) => acc + deaths, 0)
        }
        return 0;
    }, [dire, playerStates]);

    return <div className={classNames('deathCounter', {dire})}>
        <div className={'content'}>
            <AnimatedNumber value={deaths} formatValue={formatter} />
        </div>

        <style jsx>{`
            .deathCounter {
                width: 100%;
                transform: skew(10deg);
                box-shadow: 0 0 10px rgba(0,0,0,.5);
                position: relative;
                z-index: 1;
                background-color: var(--anthrazit);
            }    

            .dire {
                transform: skew(-10deg);
            }   

            .content {
                transform: skew(-10deg);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-size: 1.7rem;
                font-weight: bold;
                color: #CCC;
                line-height: 1.7rem;
            }

            .dire .content {
                transform: skew(10deg);
            }

        `}</style>
    </div>
}