import { ReactElement } from "react";
import AnimatedNumber from "animated-number-react";
import classNames from "classnames";

const fomatValue = (value) => value.toFixed(0);

interface Props {
    value: number;
    label: string
    type: 'primary' | 'secondary';
    isPercent?: boolean;
}

export default function Value({label, type, value, isPercent}: Props): ReactElement {
    return <div className={'box'}>
        <div className={classNames('value', type)}>
            <AnimatedNumber value={value} formatValue={fomatValue}/>{isPercent && '%'}
        </div>

        <div className={'label'}>{label}</div>

        <style jsx>{`
            .box {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }   

            .value {
                font-size: 3rem;
                font-weight: bold;
            } 

            .primary {
                color: var(--primary-accent);
                text-shadow: 0 0 5px var(--primary-accent);
            }

            .secondary {
                color: var(--secondary-accent);
                text-shadow: 0 0 5px var(--secondary-accent);
            }

            .label {
                color: #CCC;
                text-transform: uppercase;
                font-size: .9rem;
            }
        `}</style>
    </div>
}