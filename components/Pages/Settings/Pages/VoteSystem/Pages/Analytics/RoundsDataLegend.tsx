import classNames from "classnames";
import { ReactElement } from "react";

interface Props {
    comparing: boolean;
}

const legend = [
    {
        name: 'primary',
        label: 'Viewers'
    }, {
        name: 'primary-darken',
        label: 'Entrants'
    } , {
        name: 'secondary',
        label: 'Compared viewers'
    }, {
        name: 'secondary-darken',
        label: 'Compared entrants'
    }
]
export default function RoundsDataLegend({comparing}: Props): ReactElement {
    return <div className={'legend'}>
        {legend.slice(0, comparing ? 4 : 2).map(({name, label}) => <div key={name} className={classNames('entry', name)}>
            <div className={'dot'} />
            <div className={'label'}>{label}</div>
        </div>)}

        <style jsx>{`
            .legend {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: center;
                margin-top: 2rem;
            }    

            .entry {
                margin-right: 1.25rem;
                margin-bottom: .5rem;
                display: inline-flex;
                align-items: center;
            }

            .dot {
                height: .75rem;
                width: .75rem;
                border-radius: .1rem;
                margin-right: .25rem;
                flex-shrink: 0;
            }

            .primary .dot {
                background-color: var(--primary-accent);
                box-shadow: 0 0 5px var(--primary-accent);
            }

            .primary-darken .dot {
                background-color: var(--primary-accent-darken);
            }

            .secondary .dot {
                background-color: var(--secondary-accent);
                box-shadow: 0 0 5px var(--secondary-accent);
            }

            .secondary-darken .dot {
                background-color: var(--secondary-accent-darken);
            }

            .label {
                font-size: .9rem;
            }
        `}</style>
    </div>
}