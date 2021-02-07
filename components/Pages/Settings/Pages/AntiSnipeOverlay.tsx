import { AntiSnipeOverlay as AntiSnipeOverlayState, User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { patchAntiSnipe } from "../../../../modules/reducer/AntiSnipeOverlay";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useAntiSnipeOvelay } from "../../../../modules/selector/AntiSnipeOverlay";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import BrowserSource from "../../../Ui/browsersource/BrowserSource";
import Input from "../../../Ui/input/Input";
import Radio from "../../../Ui/toggle/Radio";
import SettingsTitle from "../SettingsTitle";
import Preview from "./WLStats/Pages/AntiSnipeOverlay/Preview";


export default function AntiSnipeOverlay(): ReactElement {
    const overlay = useAntiSnipeOvelay();
    const user = useCurrentUser();
    const dispatch = useDispatch();
    const patchOverlay = useCallback((data: Partial<AntiSnipeOverlayState>) => dispatch(patchAntiSnipe(data)), [dispatch]);
    const patchUser = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    return <div className={'overlay'}>
        <div>
            <SettingsTitle>Display</SettingsTitle>
            <br />
            <div>
                <Radio checked={overlay?.type === 'normal'} onClick={() => patchOverlay({type: 'normal'})} label={'Full'} regularLabel />
                <Radio checked={overlay?.type === 'rounded'} onClick={() => patchOverlay({type: 'rounded'})} label={'Visible base'} regularLabel />
            </div>

            <br />

            <div className={'opacity'}>
                <Input label={'Opacity'} value={'' + overlay.opacity} onChange={(opacity) => patchOverlay({opacity: +opacity})} type={'number'} min={0} max={100} />
            </div>

            <br />
            <br />
            <br />

            <SettingsTitle>Browser Source</SettingsTitle>
            <BrowserSource individualSource={Boolean(user?.individualOverlayMinimap)} setIndividualSource={(individualOverlayMinimap) => patchUser({individualOverlayMinimap})} hasIndividualSource route={'/antiSnipe'} />
        </div>

        <div>
            <SettingsTitle>Preview</SettingsTitle>
            <Preview {...overlay} />
        </div>

        <style jsx>{`
            .overlay {
                padding: 2rem 2.75rem;
                display: grid;
                grid-template-columns: .5fr .5fr;
                grid-gap: 2rem;
            }    

            .opacity {
                max-width: 10vw;
            } 
        `}</style>
    </div>
}