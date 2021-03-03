import { ReactElement, useCallback } from "react";

import BrowserSource from "../../../Ui/browsersource/BrowserSource";
import SettingsTitle from "../SettingsTitle";
import { User } from "@streamdota/shared-types";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import { useDispatch } from "react-redux";

export default function KeywordListener(): ReactElement {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const patchUser = useCallback(
    (data: Partial<User>) => dispatch(updateCurrentUser(data)),
    [dispatch]
  );

  return (
    <div className={"overlay"}>
      <div>
        <SettingsTitle>Browser Source</SettingsTitle>
        <BrowserSource
          hasIndividualSource={false}
          route={"/keywordListener"}
          overlayActive={Boolean(user?.useKeywordListenerOverlay)}
          setOverlayActive={(useKeywordListenerOverlay) =>
            patchUser({ useKeywordListenerOverlay })
          }
        />
      </div>
      <style jsx>{`
        .overlay {
          padding: 2rem 2.75rem;
          display: grid;
          grid-template-columns: 0.5fr 0.5fr;
          grid-gap: 2rem;
        }
      `}</style>
    </div>
  );
}
