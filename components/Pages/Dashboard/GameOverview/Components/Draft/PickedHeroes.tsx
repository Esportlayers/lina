import { ReactElement, useCallback, useState } from "react";
import {TeamDraftData} from '@esportlayers/morphling';
import PickedHero from "./PickedHero";

interface Props {
    data: TeamDraftData;
    overlayActive: boolean;
    onShowOverlay: () => void;
}

export default function PickedHeroes({data, overlayActive, onShowOverlay}: Props): ReactElement {
    return <div className={'picksGrid'}>
        <div className={'entry'}>
            {data?.pick0_id !== 0 && <PickedHero heroId={data.pick0_id} heroClass={data.pick0_class} overlayActive={overlayActive} onShowOverlay={onShowOverlay} />}
        </div>
        <div className={'entry'}>
            {data?.pick1_id !== 0 && <PickedHero heroId={data.pick1_id} heroClass={data.pick1_class} overlayActive={overlayActive} onShowOverlay={onShowOverlay} />}
        </div>
        <div className={'entry'}>
            {data?.pick2_id !== 0 && <PickedHero heroId={data.pick2_id} heroClass={data.pick2_class} overlayActive={overlayActive} onShowOverlay={onShowOverlay} />}
        </div>
        <div className={'entry'}>
            {data?.pick3_id !== 0 && <PickedHero heroId={data.pick3_id} heroClass={data.pick3_class} overlayActive={overlayActive} onShowOverlay={onShowOverlay} />}
        </div>
        <div className={'entry'}>
            {data?.pick4_id !== 0 && <PickedHero heroId={data.pick4_id} heroClass={data.pick4_class} overlayActive={overlayActive} onShowOverlay={onShowOverlay} />}
        </div>

        <style jsx>{`
            .picksGrid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-column-gap: 1rem;
            }

            .entry {
                border-radius: 1rem;
                overflow: hidden;
                border: 1px solid rgba(0,0,0,.2);
                box-shadow: 2px 2px 10px rgba(0,0,0,.1);
                min-height: 415px;
            }    

            @media screen and (max-width: 1160px) {
                .entry {
                    min-height: 365px;
                }
            }

            @media screen and (max-width: 1000px) {
                .picksGrid {
                    order: 3;
                }

                .picksGrid + .picksGrid {
                    order: 6;
                }   
            }
        `}</style>
    </div>;
}