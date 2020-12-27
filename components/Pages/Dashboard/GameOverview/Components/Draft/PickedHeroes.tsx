import { ReactElement } from "react";
import {TeamDraftData} from '@esportlayers/morphling';
import PickedHero from "./PickedHero";

interface Props {
    data: TeamDraftData;
}

export default function PickedHeroes({data}: Props): ReactElement {
    return <div className={'picksGrid'}>
        <PickedHero heroId={data.pick0_id} heroClass={data.pick0_class} />
        <PickedHero heroId={data.pick1_id} heroClass={data.pick1_class} />
        <PickedHero heroId={data.pick2_id} heroClass={data.pick2_class} />
        <PickedHero heroId={data.pick3_id} heroClass={data.pick3_class} />
        <PickedHero heroId={data.pick4_id} heroClass={data.pick4_class} />

        <style jsx>{`
            .picksGrid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-column-gap: 2rem;
            }    
        `}</style>
    </div>;
}