import AuthorizeOAuthScope from "./AuthorizeOAuthScope";
import Input from "../../../../Ui/input/Input";
import { ReactElement } from "react";
import SettingsTitle from "../../SettingsTitle";
import TestPrediction from "./TestPerdiction";
import Toggle from "../../../../Ui/toggle/Toggle";
import { updateCurrentUser } from "../../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../../modules/selector/UiSelector";
import { useDispatch } from "react-redux";
import PredictionTexts from "./PredictionTexts";

export default function Predictions(): ReactElement {
  const dispatch = useDispatch();
  const user = useCurrentUser();

  return <div className={'predictionsPage'}>
    {/** @ts-ignore */}
    <AuthorizeOAuthScope hasPredictionAccess={Boolean(user?.hasPredictionAccess)} />

    <br />
    <br />

    <SettingsTitle>Settings</SettingsTitle>
    <Toggle checked={user?.usePredictions || false} onChange={(usePredictions) => dispatch(updateCurrentUser({ usePredictions }))} label={'Predictions active (always starting automatically)'} />

    <br />

    <div className={'duration'}>
      <Input
        label={"Prediction duration (seconds)"}
        value={"" + user?.predictionDuration || 90}
        onChange={(duration) => dispatch(updateCurrentUser({ predictionDuration: +duration }))}
        type={"number"}
      />
    </div>

    <br />

    <PredictionTexts />

    <br />
    <br />

    <TestPrediction />

    <style jsx>{`
      .predictionsPage {
        padding: 2rem 2.75rem;
      }

      .duration {
        max-width: 200px;
      }
    `}</style>
  </div>
}