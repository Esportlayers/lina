import { ReactElement } from "react";
import {TeamDraftData} from '@esportlayers/morphling';
import HeroAvatar from "../../../Components/HeroAvatar";

interface Props {
    data: TeamDraftData;
}

export default function BannedHeroes({data}: Props): ReactElement {
    return <div className={'bansGrid'}>
        <div className={'entry'}>
            {data?.ban0_class.length > 0 && <HeroAvatar heroClass={data.ban0_class} prefix={'h'}/>}
        </div>
        <div className={'entry'}>
            {data?.ban1_class.length > 0 && <HeroAvatar heroClass={data.ban1_class} prefix={'h'}/>}
        </div>
        <div className={'entry'}>
            {data?.ban2_class.length > 0 && <HeroAvatar heroClass={data.ban2_class} prefix={'h'}/>}
        </div>
        <div className={'entry'}>
            {data?.ban3_class.length > 0 && <HeroAvatar heroClass={data.ban3_class} prefix={'h'}/>}
        </div>
        <div className={'entry'}>
            {data?.ban4_class.length > 0 && <HeroAvatar heroClass={data.ban4_class} prefix={'h'}/>}
        </div>
        <div className={'entry'}>
            {data?.ban5_class.length > 0 && <HeroAvatar heroClass={data.ban5_class} prefix={'h'}/>}
        </div>
        <div className={'entry'}>
            {data?.ban6_class.length > 0 && <HeroAvatar heroClass={data.ban6_class} prefix={'h'} />}
        </div>

        <style jsx>{`
            .bansGrid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-column-gap: 2rem;
            }

            .entry {
                border-radius: 1rem;
                overflow: hidden;
                height: 100%;
                width: 100%;
                border: 1px solid rgba(0,0,0,.2);
                box-shadow: 2px 2px 10px rgba(0,0,0,.1);
                filter: grayscale(.5);
                min-height: 52px;
            }  

            @media screen and (max-width: 1160px) {
                .bansGrid {
                    grid-column-gap: .5rem;
                }
            }   

            @media screen and (max-width: 1000px) {
                .bansGrid {
                    order: 2;
                }

                .bansGrid + .bansGrid {
                    order: 5;
                }
            }
        `}</style>

    </div>;
}