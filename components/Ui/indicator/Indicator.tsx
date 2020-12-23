import classNames from "classnames";
import { ReactElement } from "react";

interface Props {
    active: boolean;
}

export default function Indicator({active}: Props): ReactElement {
    return <div className={classNames('indicator', {active})}>
        <div className={'ring'} />
        
        <style jsx>{`
            .indicator {
                width: 15px;
                height: 15px;
                background-color: var(--primary-accent);
                opacity: .5;
                border-radius: 50%;
                position: relative;
                margin-right: .7rem;
            }    

            .active {
                opacity: 1;
            }

            .ring {
                height: 25px;
                width: 25px;
                position: absolute;
                left: -5px;
                right: -5px;
                bottom: -5px;
                top: -5px;
                border: 3px solid var(--primary-accent);
                opacity: 0;
                border-radius: 50%;
            }

            @keyframes pulsate {
                0% {transform: scale(0.1, 0.1); opacity: 0;}
                50% {opacity: 1;}
                100% {transform: scale(1.2, 1.2); opacity: 0;}
            }

            .active .ring {
                animation: pulsate 1s ease-out;
                animation-iteration-count: infinite; 
            }
        `}</style>
    </div>
}