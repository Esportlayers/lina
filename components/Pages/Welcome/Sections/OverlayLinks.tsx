
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import Container from "../../../Ui/container/Container";
import { FullPageSliderProps } from "../../../Ui/fullpageslide/FullPageSlide";
import NudgeFromBottom from "../../../Ui/motion/NudgeFromBottom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from "../../../Ui/button/Button";
import Toggle from "../../../Ui/toggle/Toggle";
import { useDispatch } from "react-redux";
import { User } from "@streamdota/shared-types";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";

const availableOverlays = [
    'useDotaStatsOverlay',
    'useMinimapOverlay',
    'useRoshanTimerOverlay',
    'useDraftStatsOverlay',
    'useHeroStatsOverlay',
    'useVoteTimerOverlay',
    'useVoteToplistOverlay',
    'useVoteDistributionOverlay',
];

const labelMap = {
    useDotaStatsOverlay: 'Dota WL',
    useMinimapOverlay: 'Anti Snipe Overlay',
    useRoshanTimerOverlay: 'Roshan Timer',
    useDraftStatsOverlay: 'Draft Stats',
    useHeroStatsOverlay: 'Hero Stats',
    useVoteTimerOverlay: 'Vote Timer',
    useVoteToplistOverlay: 'Vote Toplist',
    useVoteDistributionOverlay: 'Vote Distribution',
}

export default function OverlayLinks({onContinue}: FullPageSliderProps): ReactElement {
    const currentUser = useCurrentUser();
    const link = process.env.FRAME_API_URL + '/general?auth=' + (currentUser && currentUser.frameApiKey);
    const [isCopied, setIsCopied] = useState(false);
    const dispatch = useDispatch();
    const patch = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    useEffect(() => {
        isCopied && setTimeout(() => setIsCopied(false), 5000);
    }, [isCopied])
    return <Container>
        <NudgeFromBottom delay={.2}>
            <h2>Your overlay link</h2>
        </NudgeFromBottom>

        <br />

        <NudgeFromBottom delay={.3}>
            <div>Create a new full screen browser source in your streaming software and use the link below as source</div>
        </NudgeFromBottom>

        <br />
        <br />
        <br />

        <NudgeFromBottom delay={.5}>
            <CopyToClipboard text={link} onCopy={() => setIsCopied(true)}>
                <div className={'copyToClipboard'}>
                    {!isCopied && link}
                    {isCopied && 'Link has been copied to your clipboard!'}

                    <div className={'copyButton'}>
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 17.5V19.0625C12.5 19.5803 12.0803 20 11.5625 20H0.9375C0.419727 20 0 19.5803 0 19.0625V4.6875C0 4.16973 0.419727 3.75 0.9375 3.75H3.75V15.3125C3.75 16.5187 4.73129 17.5 5.9375 17.5H12.5ZM12.5 4.0625V0H5.9375C5.41973 0 5 0.419727 5 0.9375V15.3125C5 15.8303 5.41973 16.25 5.9375 16.25H16.5625C17.0803 16.25 17.5 15.8303 17.5 15.3125V5H13.4375C12.9219 5 12.5 4.57812 12.5 4.0625ZM17.2254 2.85043L14.6496 0.27457C14.4738 0.0987666 14.2353 1.29998e-06 13.9867 0L13.75 0V3.75H17.5V3.51332C17.5 3.26469 17.4012 3.02624 17.2254 2.85043V2.85043Z" fill="black"/>
                        </svg>
                    </div>
                </div>
            </CopyToClipboard>
        </NudgeFromBottom>
        
        <NudgeFromBottom delay={.5}>
            <div className={'resolution'}>Recommended resolution: 1920 x 1080</div>
        </NudgeFromBottom>

        <br />
        <br />

        <NudgeFromBottom delay={.8}>
            <h3>Active Overlays</h3>

            {currentUser && <div className={'activeGrid'}>
                {availableOverlays.map((key) => <div className={'key'}>
                    <Toggle checked={currentUser[key]} label={labelMap[key]} onChange={(checked) => patch({[key]: checked})} />
                </div>)}
            </div>}
        </NudgeFromBottom>

        <br />
        <br />
        
        <NudgeFromBottom delay={1}>
            <Button onClick={onContinue}>
                I created the browser source
            </Button>
        </NudgeFromBottom>

        <style jsx>{`
            .copyToClipboard {
                border-radius: .25rem;
                background-color: rgba(0,0,0,.2);
                padding: 1rem 5.5rem 1rem 1.5rem;
                max-width: 70vw;
                margin: 0 auto 0 auto;
                text-align: left;
                position: relative;
                cursor: copy;
            }    

            .copyButton {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                background-color: var(--primary-accent);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 1.5rem;
                border-radius: 0 .25rem .25rem 0;
            }

            .resolution {
                font-size: .8rem;
                margin-top: 1rem;
            }

            .activeGrid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 2rem;
                max-width: 500px;
                margin: 3rem auto;
                justify-content: center;
            }
        `}</style>
    </Container>
}