import { ReactElement, useMemo } from "react";
import { Types } from "./HeroStats";
import Image from 'next/image';

interface Props {
    type: Types;
    types: Array<{type: Types, label: string}>;
}

export default function Type({type, types}: Props): ReactElement {
    const label = useMemo(() => types.find(({type: itType}) => itType === type).label, [type, types]);
    return <div className={'type'}>
        <div className={'content'}>
            <div className={'icon'}>
                <Image layout={'responsive'} width={'100%'} height={'50%'} src={`/images/heroStatsIcons/${type}.svg`} />
            </div>
            <div className={'label'}>{label}</div>
        </div>
        <style jsx>{`
            .type {
                box-shadow: 0 2px 10px rgba(0,0,0,0.5);
                height: 110%;
                width: 100%;
                margin: -5% auto auto auto;
                position: relative;
                border-radius: 1rem;
            }

            .content {
                background-color: #293039;
                width: 100%;
                height: 100%;
                border-radius: 1rem;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                padding: 2rem 1rem;
            }

            .icon {
                flex-grow: 1;
            }

            .label {
                flex-shrink: 0;
                text-align: center;
            }
        `}</style>
    </div>
}