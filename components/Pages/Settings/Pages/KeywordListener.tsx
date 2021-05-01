import { ReactElement, useCallback } from "react";

import BrowserSource from "../../../Ui/browsersource/BrowserSource";
import Input from "../../../Ui/input/Input";
import SettingsTitle from "../SettingsTitle";
import Toggle from "../../../Ui/toggle/Toggle";
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

  const toggleKeywordListener = useCallback((useKeywordListener) => {
    dispatch(updateCurrentUser({ useKeywordListener }));
  }, [dispatch]);

  const changeKeyword = useCallback(
    (keywordListener) => {
      dispatch(updateCurrentUser({ keywordListener }));
    },
    [dispatch]
  );

  return (
    <div className={"overlay"}>
      <div>
        <SettingsTitle>Settings</SettingsTitle>
        <Toggle checked={user?.useKeywordListener || false} onChange={toggleKeywordListener} label={'Keyword listener active'} />

        <br />

        <Input
          value={user.keywordListener || ""}
          label={"Keyword"}
          onChange={changeKeyword}
        />

        <br />
        <br />
        <br />

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
