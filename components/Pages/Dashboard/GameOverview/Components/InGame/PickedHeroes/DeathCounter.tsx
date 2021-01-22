import { ReactElement } from "react";
import classNames from 'classnames';

interface Props {
    dire?: boolean;
}

export default function DeathCounter({dire}: Props): ReactElement {
    return <div className={classNames('deathCounter', {dire})}>
        <div className={'content'}>

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
            }

            .dire .content {
                transform: skew(10deg);
            }

        `}</style>
    </div>
}