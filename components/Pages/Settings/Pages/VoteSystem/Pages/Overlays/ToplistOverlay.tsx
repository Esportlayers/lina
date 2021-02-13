import { User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import { useVoteOverlay } from "../../../../../../../modules/selector/VoteOverlay";
import BrowserSource from "../../../../../../Ui/browsersource/BrowserSource";
import ColorPicker from "../../../../../../Ui/input/Color";
import Input from "../../../../../../Ui/input/Input";
import Toggle from "../../../../../../Ui/toggle/Toggle";
import SettingsTitle from "../../../../SettingsTitle";
import { usePatchVoteOverlay } from "../Overlays";
import Toplist from "./Toplist";

const toplist = [
    {name: 'rmiLEtAnCI', total: 18, won: 16},
    {name: 'rarSeMeNthFFcyCL', total: 16, won: 15},
    {name: 'UrDrIblect', total: 18, won: 15},
    {name: 'DaRNATHRIo', total: 15, won: 14},
    {name: 'IfY', total: 16, won: 14},
    {name: 'thYSmaiNTerahAnd', total: 14, won: 13},
    {name: 'hesPEdenEW', total: 14, won: 12},
    {name: 'hurSTIoNtEareAdU', total: 11, won: 11},
    {name: 'rarSeMeNthEAcyCL', total: 10, won: 10},
    {name: 'rarSeMeTThEAcXL', total: 10, won: 8},
    {name: 'rmiLEXXCI', total: 10, won: 7},
    {name: 'rarSeMYthFFcyCL', total: 10, won: 7},
    {name: 'UrasrIblect', total: 10, won: 7},
    {name: 'DaRNDDRIo', total: 14, won: 6},
    {name: 'IXYCV', total: 5, won: 5},
    {name: 'thYSmaDDDahAnd', total: 5, won: 5},
    {name: 'hesPEAASnEW', total: 8, won: 5},
    {name: 'hurSTIDASareAdU', total: 8, won: 5},
    {name: 'rarSeMeFDcyCL', total: 9, won: 5},
    {name: 'rarSeMeTThEAXYCL', total: 12, won: 5},
]

export default function ToplistOverlay(): ReactElement {
    const voteOverlay = useVoteOverlay();
    const user = useCurrentUser();
    const patchOverlay = usePatchVoteOverlay();
    const dispatch = useDispatch();
    const patchUser = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), [dispatch]);

    return <div className={'overlayGrid'}>

        <div>
            <SettingsTitle>Font</SettingsTitle>
            <div className={'fontSize'}>
                <Input label={'Font size'} value={'' + voteOverlay.toplistFontSize} onChange={(toplistFontSize) => patchOverlay({toplistFontSize: +toplistFontSize})} type={'number'}  />
            </div>

            <SettingsTitle>Colors</SettingsTitle>
            <div className={'colorGrid'}>
                <ColorPicker label={'Background'} color={voteOverlay.toplistBackground} onChange={(toplistBackground) => patchOverlay({toplistBackground})} />
                <ColorPicker label={'Text'} color={voteOverlay.toplistFont} onChange={(toplistFont) => patchOverlay({toplistFont})} />
            </div>


            <SettingsTitle>Settings</SettingsTitle>
            <Toggle checked={Boolean(voteOverlay.toplistShowRank)} label={'Show ranks'} onChange={(toplistShowRank) => patchOverlay({toplistShowRank})}/>
            <br />
            <Toggle checked={Boolean(voteOverlay.toplistShowTotalBets)} label={'Show total votes'} onChange={(toplistShowTotalBets) => patchOverlay({toplistShowTotalBets})}/>
            <br />
            <Toggle checked={Boolean(voteOverlay.toplistShowAccuracy)} label={'Show accuracy'} onChange={(toplistShowAccuracy) => patchOverlay({toplistShowAccuracy})}/>
            <br />
            <div className={'fontSize'}>
                <Input label={'Max toplist entries'} value={'' + voteOverlay.toplistMaxEntry} onChange={(toplistMaxEntry) => patchOverlay({toplistMaxEntry: +toplistMaxEntry})} type={'number'}  />
            </div>
            <br />
            <br />
            <br />
            <SettingsTitle>Browser Source</SettingsTitle>
            <BrowserSource 
                route={'/betting/toplist'} 
                hasIndividualSource 
                individualSource={user.individualOverlayVoteToplist} 
                setIndividualSource={(individualOverlayVoteToplist) => patchUser({individualOverlayVoteToplist})} 
                overlayActive={Boolean(user?.useVoteToplistOverlay)}
                setOverlayActive={(useVoteToplistOverlay) => patchUser({useVoteToplistOverlay})}
            />
        </div>

        <div>

            <div className={'preview'}>
                <SettingsTitle>Preview</SettingsTitle>

                <div className={'previewContainer'}>
                    <img className={'exampleBackground'} src={'/images/dota_left_part.png'} />

                    <div className={'toplist'}>
                        <Toplist overlay={voteOverlay} list={toplist.slice(0, voteOverlay.toplistMaxEntry)} />
                    </div>
                </div>
            </div>
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
                padding: 20px;
                padding-top: 7rem;
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
            .toplist {
                position: relative;
                top: 8em;
                right: -1em;
            }
        `}</style>
    </div>
}