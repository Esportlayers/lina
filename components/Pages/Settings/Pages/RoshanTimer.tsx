import { RoshOverlay, User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { patchRoshOverlay } from "../../../../modules/reducer/RoshanOverlay";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useRoshOverlay } from "../../../../modules/selector/RoshanOverlay";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import BrowserSource from "../../../Ui/browsersource/BrowserSource";
import Description from "../../../Ui/description/Description";
import ColorPicker from "../../../Ui/input/Color";
import Input from "../../../Ui/input/Input";
import GoogleVariantSelect from "../../../Ui/radio/GoogleVariantSelect";
import GoogleFontSelect from "../../../Ui/select/GoogleFontSelect";
import SettingsTitle from "../SettingsTitle";
import Preview from "./RoshanTimer/Preview";


export default function RoshanTimer(): ReactElement {
    const overlay = useRoshOverlay();
    const user = useCurrentUser();
    const dispatch = useDispatch();
    const patchOverlay = useCallback((data: Partial<RoshOverlay>) => dispatch(patchRoshOverlay(data)), [dispatch]);
    const patchUser = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    return <div className={'overlay'}>
        <div>
            <SettingsTitle>Font Family</SettingsTitle>
            <Description>All <a href={'https://fonts.google.com'} target={'_blank'}>Google Fonts</a> are available, please check the google page and select the font you like.</Description>
            <br />
            <GoogleFontSelect font={overlay?.font} setFont={(font) => patchOverlay({font})} />
            <br />
            <br />
            <GoogleVariantSelect font={overlay?.font} variant={overlay?.variant} setVariant={(variant) => patchOverlay({variant})} />
            <br />
            <br />
            <div className={'fontSize'}>
                <Input label={'Font size'} value={'' + overlay?.fontSize} onChange={(fontSize) => patchOverlay({fontSize: +fontSize})} type={'number'}  />
            </div>

            <br />
            <br />
            <br />

            <div>
                <SettingsTitle>Colors</SettingsTitle>
                <div className={'colorGrid'}>
                    <ColorPicker label={'Aegis expiration color'} color={overlay?.aegisColor} onChange={(aegisColor) => patchOverlay({aegisColor})} />
                    <ColorPicker label={'Base respawn color'} color={overlay?.baseColor} onChange={(baseColor) => patchOverlay({baseColor})} />
                    <ColorPicker label={'Variable respawn color'} color={overlay?.variableColor} onChange={(variableColor) => patchOverlay({variableColor})} />
                </div>
            </div>
            
        </div>
        <div>
            <SettingsTitle>Preview</SettingsTitle>
            <Preview overlay={overlay} />

            <br />
            <br />
            <br />

            <SettingsTitle>Browser Source</SettingsTitle>
            <BrowserSource route={'/casting/roshanTimer'} individualSource/>
        </div>
        <style jsx>{`
            .overlay {
                padding: 2rem 2.75rem;
                display: grid;
                grid-template-columns: .5fr .5fr;
                grid-gap: 2rem;
                max-height: 100vh;
                overflow-y: scroll;
            }    

            .fontSize {
                max-width: 10vw;
            }

            .opacity {
                max-width: 10vw;
            } 

            .colorGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, 225px);
                grid-gap: 1rem;
            }
        `}</style>
    </div>
}