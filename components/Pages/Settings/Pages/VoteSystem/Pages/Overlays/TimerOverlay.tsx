import { User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import { useVoteOverlay } from "../../../../../../../modules/selector/VoteOverlay";
import BrowserSource from "../../../../../../Ui/browsersource/BrowserSource";
import ColorPicker from "../../../../../../Ui/input/Color";
import Input from "../../../../../../Ui/input/Input";
import SettingsTitle from "../../../../SettingsTitle";
import { usePatchVoteOverlay } from "../Overlays";
import Timer from "./Timer";

export default function TimerOverlay(): ReactElement {
    const voteOverlay = useVoteOverlay();
    const user = useCurrentUser();
    const patchOverlay = usePatchVoteOverlay();
    const dispatch = useDispatch();
    const patchUser = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    return <div className={'overlayGrid'}>
        <div className={'preview'}>
            <SettingsTitle>Preview</SettingsTitle>

            <div className={'previewContainer'}>
                <img className={'exampleBackground'} src={'/images/dota_header.png'} />
                <div className={'slider'}><div className={'timerContainer'}><Timer overlay={voteOverlay} /></div></div>
            </div>

        </div>

        <div>

            <SettingsTitle>Colors</SettingsTitle>
            <div className={'colorGrid'}>
                <ColorPicker label={'Background'} color={voteOverlay.timerBackground} onChange={(timerBackground) => patchOverlay({timerBackground})} />
                <ColorPicker label={'Text'} color={voteOverlay.timerFont} onChange={(timerFont) => patchOverlay({timerFont})} />
            </div>
        </div>

        <div>
            <SettingsTitle>Font</SettingsTitle>
            <div className={'fontSize'}>
                <Input label={'Font size'} value={'' + voteOverlay.timerFontSize} onChange={(timerFontSize) => patchOverlay({timerFontSize: +timerFontSize})} type={'number'}  />
            </div>

            <br /><br /><br />
            <SettingsTitle>Browser Source</SettingsTitle>
            <BrowserSource route={'/betting/timer'} hasIndividualSource individualSource={user.individualOverlayVoteTimer} setIndividualSource={(individualOverlayVoteTimer) => patchUser({individualOverlayVoteTimer})} />
        </div>

        <style jsx>{`
            .fontSize {
                width: 10rem;
                margin-bottom: 3rem;
            }    

            .overlayGrid {
                display: grid;
                grid-template-columns: .5fr .5fr;
                grid-gap: 2rem;
                padding-bottom: 1rem;
            }

            .colorGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, 225px);
                grid-gap: 1rem;
            }

            .preview {
                grid-column: 1 / -1;
            }


            .previewContainer {
                position: relative;
                min-width: 800px;
                padding: 20px;
                padding-top: 7rem;
                overflow: hidden;
            }

            .exampleBackground {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                object-fit: cover;
                object-position: 50% 50%;
                width: 100%;
            }

            .slider {
                position: relative;
            }

            .timerContainer {
                display: flex;
            }
        `}</style>
    </div>
}