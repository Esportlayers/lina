import Tether, { getWSUrl } from "@esportlayers/io";
import { User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../../../../modules/reducer/Ui";
import { useDotaOverlay } from "../../../../../../../modules/selector/DotaOverlay";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import Description from "../../../../../../Ui/description/Description";
import Radio from "../../../../../../Ui/toggle/Radio";
import Toggle from "../../../../../../Ui/toggle/Toggle";
import SettingsTitle from "../../../../SettingsTitle";
import DotaStatsTable from "./DotaStatsTable";


export default function General(): ReactElement {
    const user = useCurrentUser();
    const dispatch = useDispatch();
    const patchUser = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    return <div className={'grid'}>
        <div>
            <SettingsTitle>Dota WL Reset</SettingsTitle>
            <Description>When should the stats be reseted</Description>
            <br />
            <div>
                <Radio checked={user?.dotaStatsFrom === 'session'} onClick={() => patchUser({dotaStatsFrom: 'session'})} label={'Session - Resetting after stream has ended'} regularLabel />
                <Radio checked={user?.dotaStatsFrom === 'day'} onClick={() => patchUser({dotaStatsFrom: 'day'})} label={'Day - Counter resets after a day and is reseted at 0:00'} regularLabel />
                <Radio checked={user?.dotaStatsFrom === 'manual'} onClick={() => patchUser({dotaStatsFrom: 'manual'})} label={'Manual - You need to reset the stats yourself'} regularLabel />
            </div>

            <br /><br />
            <SettingsTitle>Specific hidden settings</SettingsTitle>
            <Description>Decide when the counter is hidden</Description>
            <br />
            <Toggle checked={Boolean(user?.dotaStatsMenuHidden)} onChange={(dotaStatsMenuHidden) => patchUser({dotaStatsMenuHidden})} label={'Hidden in main menu'} />
            <br />
            <Toggle checked={Boolean(user?.dotaStatsPickHidden)} onChange={(dotaStatsPickHidden) => patchUser({dotaStatsPickHidden})} label={'Hidden while picking'} />
        </div>
        <div>
            {user && <Tether url={getWSUrl(process.env.API_URL + '/dota-gsi/live/' + user.frameApiKey)}>
                <DotaStatsTable />
            </Tether>}
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