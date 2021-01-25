import { EventTypes, GsiPlayersStateMessage, useTetherMessageListener } from "@esportlayers/io";
import classNames from "classnames";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { getDefaultHeader, post } from "../../../../../../../modules/middleware/Network";
import Button from "../../../../../../Ui/button/Button";
import Player from "./Player";
import Type from "./Type";

export enum Types {
    gpm = 'gpm',
    xpm = 'xpm',
    hero_damage = 'hero_damage',
    runes_activated = 'runes_activated',
    camps_stacked = 'camps_stacked',
    support_gold_spent = 'support_gold_spent',
}

const buttonTypes = [
    {type: Types.gpm, label: 'GPM'},
    {type: Types.xpm, label: 'XPM'},
    {type: Types.hero_damage, label: 'Hero Damage'},
    {type: Types.runes_activated, label: 'Rune pickups'},
    {type: Types.camps_stacked, label: 'Camps stacked'},
    {type: Types.support_gold_spent, label: 'Support gold spent'},
];

export default function HeroStats(): ReactElement {
    const [activeType, setActiveType] = useState<Types>(Types.gpm);
    const [loading, setLoading] = useState(false);
    const {value: playerStates} = useTetherMessageListener<GsiPlayersStateMessage>(EventTypes.gsi_players_state) || {value: null};

    const values = useMemo(() => {
        if(playerStates && playerStates.length > 0) {
            const maxValue = playerStates.reduce((acc, player) => Math.max(player[activeType], acc), 0);
            return playerStates.map((player) => {
                const value = player[activeType];
                const percentage = maxValue > 0 ? Math.floor((value * 100) / maxValue) : 0;
                return {percentage, value};
            });

        }
        return Array(10).fill({value: 0, percentage: 0});
    }, [activeType, playerStates]);


    const showStats = useCallback(async () => {
        if(!loading) {
            setLoading(true);
            await post(process.env.API_URL + '/casting/overlay', {data: {type: 'playerCompareGraph', data: values, dataType: activeType}}, getDefaultHeader());
            setTimeout(() => setLoading(false), 10000);
        }
    }, [loading, values, activeType]);

    return <div className={'heroStats'}>
        <div className={'heroStatsGrid'}>
            {values.slice(0, 5).map(({percentage, value}, idx) => <Player key={idx} percentage={percentage} value={value} />)}
            <Type type={activeType} types={buttonTypes} />
            {values.slice(5).map(({percentage, value}, idx) => <Player key={idx} percentage={percentage} value={value}/>)}
        </div>

        <div className={'types'}>
            {buttonTypes.map(({type, label}) => <div 
                key={type} 
                className={classNames('type', {active: activeType === type})}
                onClick={() => setActiveType(type)}
            >
                {label}
            </div>)}
        </div>

        <div className={'types'}>
            <Button onClick={showStats}>Share stats</Button>
        </div>

        <style jsx>{`
            .heroStatsGrid {
                margin: 0 auto;
                max-width: 825px;
                background-color: #333;
                width: 100%;
                height: 200px;
                display: grid;
                grid-template-columns: repeat(5, 60px) 1fr repeat(5, 60px);
                align-items: stretch;
                box-shadow: 0 5px 15px rgba(0,0,0,0.4);
            }

            .types {
                margin: 3rem 0;
                display: flex;
                justify-content: center;
            }

            .type {
                padding: .5rem 1.15rem;
                border: 1px solid #CCC;
                border-right: none;
                cursor: pointer;
                user-select: none;
            }

            .active {
                border-color: var(--primary-accent);
                box-shadow:inset 0 0 3px rgba(36, 212, 106, 0.4);
            }

            .active + .type {
                border-left-color: var(--primary-accent);
            }

            .type:hover {
                background-color: rgba(0,0,0,.2);
            }

            .type:first-child {
                border-radius: .25rem 0 0 .25rem;
            }

            .type:last-child {
                border-right: 1px solid #CCC;
                border-radius: 0 .25rem .25rem 0;
            }

            .type.active:last-child {
                border-right: 1px solid var(--primary-accent);
            }
        `}</style>
    </div>
}