import { ReactElement } from "react";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import Description from "../../../../../../Ui/description/Description";
import SettingsTitle from "../../../../SettingsTitle";


export default function General(): ReactElement {
    const user = useCurrentUser();

    return <div className={'grid'}>
        <div>
            <SettingsTitle>Dota WL Reset</SettingsTitle>
            <Description>When should the stats be reseted</Description>
        </div>
        <div>

        </div>

        <style jsx>{`
            .grid {
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: .5fr .5fr;
            }    
        `}</style>
    </div>
}