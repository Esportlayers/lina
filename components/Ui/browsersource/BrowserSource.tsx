import { ReactElement } from "react";
import { useCurrentUser } from "../../../modules/selector/UiSelector";
import Description from "../description/Description";
import Label from "../label/label";
import Toggle from "../toggle/Toggle";


interface Props {
    hasIndividualSource?: boolean;
    individualSource?: boolean;
    setIndividualSource?: (source: boolean) => void;
    route: string;
    overlayActive?: boolean;
    setOverlayActive: (active: boolean) => void;
}

function getFrameUrl(path: string, auth: string, testing: boolean): string {
    return process.env.FRAME_API_URL + path + `?auth=${auth}` + (testing ? `&testing=true` : '');
}

export default function BrowserSource({
    hasIndividualSource, 
    individualSource, 
    setIndividualSource,
    route,
    overlayActive,
    setOverlayActive,
}: Props): ReactElement {
    const user = useCurrentUser();

    return <div>
        <Toggle label={'Overlay active'} checked={overlayActive} onChange={setOverlayActive} />
        <br />
        <br />
        {hasIndividualSource && <div className={'individualSource'}>
            <Description>The overlay is automatically included in the general overlay. You can detach it with the following setting</Description>
            <br />
            <Toggle label={'Detach from general overlay'} checked={individualSource} onChange={setIndividualSource} />
        </div>}

        {Boolean(individualSource) && <div className={'frames'}>
            <br />
            <br />
            <Label label={'Frame Source'} />
            <div className={'frame'}>
                {getFrameUrl(route, user?.frameApiKey, false)}
            </div>
            <br />
            <Label label={'TestingFrame Source'} />
            <div className={'frame'}>
                {getFrameUrl(route, user?.frameApiKey, true)}
            </div>
        </div>}

        <style jsx>{`
            .frame {
                margin-top: .25rem;
                font-size: .8rem;
            }    
        `}</style>
    </div>
}