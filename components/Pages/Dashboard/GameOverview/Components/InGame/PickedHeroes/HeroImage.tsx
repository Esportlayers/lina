import { EventTypes, GsiPlayersStateMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement, useMemo } from "react";
import HeroAvatarById from "../../../../Components/HeroAvatarById";
import classNames from 'classnames';

interface Props {
    playerIndex: number;
}

export default function HeroImage({playerIndex}: Props): ReactElement {
    const {value: playerStates} = useTetherMessageListener<GsiPlayersStateMessage>(EventTypes.gsi_players_state) || {value: null};

    const player = useMemo(() => {
        if(playerStates && playerStates.length > 0) {
            return playerStates[playerIndex - 1];
        }
        return null;
    }, [playerIndex, playerStates]);

    return <div className={classNames('heroImage', `index-${playerIndex}`, {dead: player && !player.alive, noHero: !player || !player.heroId || player.heroId === -1})}>
        <div className={'image'}>
            {player && player.heroId && player.heroId !== -1 && <HeroAvatarById heroId={player.heroId} prefix={'h'} />}
        </div>

        <style jsx>{`
            .heroImage {
                box-shadow: inset 0 0 .75rem rgba(0,0,0,0.9);
                transition: height 120ms ease-in-out;
                height: 2.9rem;
            }    

            .noHero {
                height: 3.7rem;
            }

            .image {
                transform: skew(-10deg);
                width: 120%;
                margin-left: -10%;
                position: relative;
                z-index: -1;
                height: 100%;
            }

            .index-6 .image, .index-7 .image, .index-8 .image, .index-9 .image, .index-10 .image {
                transform: skew(10deg);
            }

            .dead {
                filter: grayscale(1);
            }
        `}</style>
    </div>
}