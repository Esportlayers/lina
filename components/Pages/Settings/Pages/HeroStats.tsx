import { User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import BrowserSource from "../../../Ui/browsersource/BrowserSource";
import SettingsTitle from "../SettingsTitle";

export default function HeroStats(): ReactElement {
    const user = useCurrentUser();
    const dispatch = useDispatch();
    const patchUser = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    return <div className={'overlay'}>
        <div>
            <SettingsTitle>Browser Source</SettingsTitle>
            <BrowserSource 
                individualSource={Boolean(user?.individualOverlayVoteHeroStats)} 
                setIndividualSource={(individualOverlayVoteHeroStats) => patchUser({individualOverlayVoteHeroStats})} 
                hasIndividualSource 
                route={'/casting/playerCompareStats'} 
                overlayActive={Boolean(user?.useHeroStatsOverlay)}
                setOverlayActive={(useHeroStatsOverlay) => patchUser({useHeroStatsOverlay})}
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