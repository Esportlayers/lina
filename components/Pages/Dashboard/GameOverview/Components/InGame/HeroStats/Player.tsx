import { ReactElement } from "react";
import AnimatedNumber from "animated-number-react";

const formatter = (value) => value.toFixed(0);

interface Props {
    percentage: number;
    value: number;
}

export default function Player({percentage, value}: Props): ReactElement {
    return <div className={'playerWrapper'}>
        <div className={'value'}><AnimatedNumber value={value} formatValue={formatter} duration={120}/></div>
        <div className={'valueBar'}>
            <div className={'progress'} style={{height: percentage + '%'}}/>
        </div>

        <style jsx>{`
            .playerWrapper {
                width: 100%;
                height: 100%;
                background: var(--anthrazit) url('data:image/svg+xml;utf8,<svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="1.5" height="1.5" fill="#393D43"/><rect y="1.5" width="1.5" height="1.5" fill="#424C5A"/><rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#393D43"/><rect x="1.5" width="1.5" height="1.5" fill="#424C5A"/></svg>');
                box-shadow: inset 0 0 5px 1px rgba(0,0,0,.2);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
            }

            .value {
                padding-bottom: 1rem;
                flex-shrink: 0;
                flex-grow: 0;
                font-size: .75rem;
                font-weight: bold;
            }

            .valueBar {
                flex-grow: 1;
                height: 100%;
                width: 12px;
                background-color: #222;
                box-shadow: 0 0 5px rgba(255, 255, 255, .15);
                position: relative;
            }

            .progress {
                position: absolute;
                bottom: 0;
                right: 0;
                left: 0;
                background-color: #ff8f00;
                box-shadow: 0 0 5px rgba(255, 87, 0, 0.5);
                height: 0px;
                will-change: height;
                transition: height 120ms ease-in-out;
            }

            
        `}</style>
    </div>
}