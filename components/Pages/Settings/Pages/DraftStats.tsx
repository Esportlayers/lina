import { User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import BrowserSource from "../../../Ui/browsersource/BrowserSource";
import SettingsTitle from "../SettingsTitle";

export default function DraftStats(): ReactElement {
    const user = useCurrentUser();
    const dispatch = useDispatch();
    const patchUser = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    return <div className={'overlay'}>
        <div>
            <SettingsTitle>Browser Source</SettingsTitle>
            <BrowserSource 
                individualSource={Boolean(user?.individualOverlayDraftStats)} 
                setIndividualSource={(individualOverlayDraftStats) => patchUser({individualOverlayDraftStats})} 
                hasIndividualSource route={'/casting/draftStats'} 
                overlayActive={Boolean(user?.useDraftStatsOverlay)}
                setOverlayActive={(useDraftStatsOverlay) => patchUser({useDraftStatsOverlay})}
            />
        </div>
        <style jsx>{`
            .overlay {
                padding: 2rem 2.75rem;
                display: grid;
                grid-template-columns: .5fr .5fr;
                grid-gap: 2rem;
            }    

        `}</style>
    </div>
}