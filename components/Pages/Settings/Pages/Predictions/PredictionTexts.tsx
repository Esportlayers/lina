import { ReactElement, useCallback } from "react";

import Input from "../../../../Ui/input/Input";
import { User } from "@streamdota/shared-types";
import { updateCurrentUser } from "../../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../../modules/selector/UiSelector";
import { useDispatch } from "react-redux";

export default function PredictionTexts(): ReactElement {
  const user = useCurrentUser();

  const dispatch = useDispatch();
  const onChange = useCallback((data: Partial<User>) => dispatch(updateCurrentUser(data)), []);

  return <div className={'texts'}>
    <div className={'row'}>
      <Input
        label={"Playing prediction title"}
        value={user?.predictionPlayingTitle || 'Will I win?'}
        onChange={(predictionPlayingTitle: string) => onChange({ predictionPlayingTitle })}
        type={"text"}
      />
    </div>
    <div className={'row'}>
      <Input
        label={"Playing Option A (Yes)"}
        value={user?.predictionPlayingOptionA || 'Yes'}
        onChange={(predictionPlayingOptionA: string) => onChange({ predictionPlayingOptionA })}
        type={"text"}
      />
      <Input
        label={"Playing Option B (No)"}
        value={user?.predictionPlayingOptionB || 'No'}
        onChange={(predictionPlayingOptionB: string) => onChange({ predictionPlayingOptionB })}
        type={"text"}
      />
    </div>
    <br />
    <div className={'row'}>
      <Input
        label={"Observing prediction title"}
        value={user?.predictionObservingTitle || 'Who will win?'}
        onChange={(predictionObservingTitle: string) => onChange({ predictionObservingTitle })}
        type={"text"}
      />
    </div>
    <div className={'row'}>
      <Input
        label={"Observing Option A (Radiant)"}
        value={user?.predictionObservingOptionA || 'Radiant'}
        onChange={(predictionObservingOptionA: string) => onChange({ predictionObservingOptionA })}
        type={"text"}
      />
      <Input
        label={"Playing Option B (Dire)"}
        value={user?.predictionObservingOptionB || 'Dire'}
        onChange={(predictionObservingOptionB: string) => onChange({ predictionObservingOptionB })}
        type={"text"}
      />
    </div>

    <style jsx>{`
      .row {
        max-width: 600px;
        display: flex;
        align-items: center;
        grid-gap: 2rem;
        margin-bottom: 1rem;
      }
    `}</style>
  </div>

}