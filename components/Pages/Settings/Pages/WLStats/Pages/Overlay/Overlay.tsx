import { OverlayConfig, User } from "@streamdota/shared-types";
import { ReactElement, useCallback } from "react";

import BrowserSource from "../../../../../../Ui/browsersource/BrowserSource";
import ColorPicker from "../../../../../../Ui/input/Color";
import Description from "../../../../../../Ui/description/Description";
import GoogleFontSelect from "../../../../../../Ui/select/GoogleFontSelect";
import GoogleVariantSelect from "../../../../../../Ui/radio/GoogleVariantSelect";
import Input from "../../../../../../Ui/input/Input";
import NumberPosition from "./NumberPosition";
import SettingsTitle from "../../../../SettingsTitle";
import Toggle from "../../../../../../Ui/toggle/Toggle";
import { updateCurrentUser } from "../../../../../../../modules/reducer/Ui";
import { updateDotaOverlay } from "../../../../../../../modules/reducer/DotaOverlay";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import { useDispatch } from "react-redux";
import { useDotaOverlay } from "../../../../../../../modules/selector/DotaOverlay";

export default function Overlay(): ReactElement {
  const user = useCurrentUser();
  const overlay = useDotaOverlay();
  const dispatch = useDispatch();
  const patchOverlay = useCallback(
    (data: Partial<OverlayConfig>) => dispatch(updateDotaOverlay(data)),
    [dispatch]
  );
  const patchUser = useCallback(
    (data: Partial<User>) => dispatch(updateCurrentUser(data)),
    [dispatch]
  );

  return (
    <div className={"overlayGrid"}>
      <div>
        <SettingsTitle>Font Family</SettingsTitle>
        <Description>
          All{" "}
          <a href={"https://fonts.google.com"} target={"_blank"}>
            Google Fonts
          </a>{" "}
          are available, please check the google page and select the font you
          like.
        </Description>
        <br />
        <GoogleFontSelect
          font={overlay.font}
          setFont={(font) => patchOverlay({ font })}
        />
        <br />
        <br />
        <GoogleVariantSelect
          font={overlay.font}
          variant={overlay.variant}
          setVariant={(variant) => patchOverlay({ variant })}
        />
        <br />
        <br />
        <div className={"fontSize"}>
          <Input
            label={"Font size"}
            value={"" + overlay.fontSize}
            onChange={(fontSize) => patchOverlay({ fontSize: +fontSize })}
            type={"number"}
          />
        </div>

        <br />
        <br />
        <br />

        <div>
          <SettingsTitle>Colors</SettingsTitle>
          <div className={"colorGrid"}>
            <ColorPicker
              label={"Background"}
              color={overlay.winColor}
              onChange={(winColor) => patchOverlay({ winColor })}
            />
            <ColorPicker
              label={"Text"}
              color={overlay.lossColor}
              onChange={(lossColor) => patchOverlay({ lossColor })}
            />
          </div>
        </div>

        <br />
        <br />
        <br />

        <div>
          <SettingsTitle>Settings</SettingsTitle>
          <br />
          <Toggle
            checked={Boolean(overlay.showBackground)}
            onChange={(showBackground) => patchOverlay({ showBackground })}
            label={"Show background"}
          />
          <br />
          <Toggle
            checked={Boolean(overlay?.noAnimation)}
            onChange={(noAnimation) => patchOverlay({ noAnimation })}
            label={"Disable fade-in animation"}
          />
        </div>
      </div>

      <div>
        <SettingsTitle>Position</SettingsTitle>
        <Description>
          You can drag the numbers to adjust the position.
        </Description>

        <br />

        <NumberPosition />

        <br />
        <br />
        <br />

        <SettingsTitle>Browser Source</SettingsTitle>
        <BrowserSource
          individualSource={user.individualOverlayWLStats}
          route={"/dotaStats"}
          setIndividualSource={(individualOverlayWLStats) =>
            patchUser({ individualOverlayWLStats })
          }
          hasIndividualSource
          overlayActive={Boolean(user?.useDotaStatsOverlay)}
          setOverlayActive={(useDotaStatsOverlay) =>
            patchUser({ useDotaStatsOverlay })
          }
        />
      </div>

      <style jsx>{`
        .overlayGrid {
          display: grid;
          grid-template-columns: 0.5fr 0.5fr;
          grid-gap: 2rem;
          padding-bottom: 1rem;
        }

        .fontSize {
          width: 10rem;
        }

        .colorGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, 225px);
          grid-gap: 1rem;
        }
      `}</style>
    </div>
  );
}
