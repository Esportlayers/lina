import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { patchVoteOverlay, VoteOverlayState } from "../../../../../../modules/reducer/VoteOverlay";
import { useVoteOverlay } from "../../../../../../modules/selector/VoteOverlay";
import Description from "../../../../../Ui/description/Description";
import GoogleVariantSelect from "../../../../../Ui/radio/GoogleVariantSelect";
import GoogleFontSelect from "../../../../../Ui/select/GoogleFontSelect";
import Tabs, { Tab } from "../../../../../Ui/tabs/Tabs";
import SettingsTitle from "../../../SettingsTitle";
import DistributionOverlay from "./Overlays/DistributionOverlay";
import TimerOverlay from "./Overlays/TimerOverlay";

const tabs: Tab[] = [
    {
        name: 'Distribution',
        value: 'distribution',
        view: () => <DistributionOverlay />,
    },
    {
        name: 'Timer',
        value: 'timer',
        view: () => <TimerOverlay />,
    },
    {
        name: 'Toplist',
        value: 'toplist',
        view: () => <>Toplist</>,
    },
];


export function usePatchVoteOverlay(): (data: Partial<VoteOverlayState>) => void {
    const dispatch = useDispatch();
    return useCallback((data: Partial<VoteOverlayState>) => dispatch(patchVoteOverlay(data)), [dispatch]);
}

export default function Overlays(): ReactElement {
    const overlay = useVoteOverlay();
    const [view, setView] = useState('distribution');
    const patchOverlay = usePatchVoteOverlay();
    return <div>
        <SettingsTitle>Font Family</SettingsTitle>
        <Description>All <a href={'https://fonts.google.com'} target={'_blank'}>Google Fonts</a> are available, please check the google page and select the font you like.</Description>
        <br />
        <GoogleFontSelect font={overlay.fontFamily} setFont={(fontFamily) => patchOverlay({fontFamily})} />
        <br />
        <br />
        <GoogleVariantSelect font={overlay.fontFamily} variant={overlay.fontVariant} setVariant={(fontVariant) => patchOverlay({fontVariant})} />

        <br />
        <br />
        
        <Tabs active={view} setActive={setView} tabs={tabs} relaxedContent/>
    </div>;
}