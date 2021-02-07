import { OverlayConfig } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useDispatch } from "react-redux";
import { updateDotaOverlay } from "../../../../../../../modules/reducer/DotaOverlay";
import { useDotaOverlay } from "../../../../../../../modules/selector/DotaOverlay";
import DraggableNumber from "./DraggableNumber";


export default function NumberPosition(): ReactElement {
    const overlay = useDotaOverlay();
    const dispatch = useDispatch();
    const patchOverlay = useCallback((data: Partial<OverlayConfig>) => dispatch(updateDotaOverlay(data)), [dispatch]);

    return <>
        {overlay.font && <GoogleFontLoader fonts={[{font: overlay.font, weights: [overlay.variant]}]} />}

        <div className={'positionFrame ' + (!overlay.showBackground && 'noBg')}>
            <div className={'container'}>
                <DraggableNumber color={overlay.winColor} cfg={overlay} x={overlay.winX} y={overlay.winY} patch={(x, y) => patchOverlay({winX: x, winY: y})} height={'.9em'}>3</DraggableNumber>
                <DraggableNumber color={overlay.lossColor} cfg={overlay} x={overlay.lossX} y={overlay.lossY} patch={(x, y) => patchOverlay({lossX: x, lossY: y})} height={'.9em'}>4</DraggableNumber>
            </div>
        </div>

        <style jsx>{`
            .positionFrame {
                margin-top: 10px;
                border: 1px solid #F0F;
                width: 60px;
                width: 160px;
                transform: scale(2);
                transform-origin-y: 0;
                margin: 20px auto 0 auto;
                background-image: url('/images/w-l-background.png');
                background-size: cover;
                height: 60px;
                margin-bottom: 80px;
            }
            
            .noBg {
                background: none;
            }

            .container {
                height: 58px;
                position: relative;
            }
        `}</style>
    </>;
}