import classNames from "classnames";
import React from "react";
import { ReactElement } from "react";

const labelMap = {
    chatters: 'Viewers',
    participants: 'Entrants',
    compareChatters: 'Compared viewers',
    compareParticipants: 'Compared entrants',
}


export default function RoundsDataTooltip({ active, payload, label }): ReactElement {
    if (active && payload?.length) {
        return <div className={'tooltip'}>
            <div className={'header'}>Round #{label}</div>
            <div className={'grid'}>
                {payload.map(({dataKey, value}) => <React.Fragment key={dataKey}>
                    <div className={classNames('dot', dataKey)} />
                    <div className={'label'}>{labelMap[dataKey]}</div>
                    <div className={'value'}>{value}</div>
                </React.Fragment>)}
            </div>
            

            <style jsx>{`
                .tooltip {
                    background-color: rgba(0,0,0,.7);
                    border-radius: .5rem;
                    padding: 1rem 1.25rem;
                }   

                .header {
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .grid {
                    display: grid;
                    grid-template-columns: .75rem 1fr max-content;
                    grid-column-gap: .25rem;
                    font-size: .9rem;
                    align-items: center;
                    grid-row-gap: .5rem;
                }

                .dot {
                    height: .75rem;
                    width: .75rem;
                    border-radius: .1rem;
                    margin-right: .25rem;
                }

                .dot.chatters {
                    background-color: var(--primary-accent);
                    box-shadow: 0 0 5px var(--primary-accent);
                }

                .dot.participants {
                    background-color: var(--primary-accent-darken);
                }

                .dot.compareChatters {
                    background-color: var(--secondary-accent);
                    box-shadow: 0 0 5px var(--secondary-accent);
                }

                .dot.compareParticipants {
                    background-color: var(--secondary-accent-darken);
                }

                .value {
                    text-align: right;
                    margin-left: 2rem;
                }
            `}</style>
        </div>;
    }
    return null;
};