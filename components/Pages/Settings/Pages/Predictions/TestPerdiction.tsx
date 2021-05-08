import { ReactElement, useCallback } from "react";
import { testPrediction, testPredictionResolve } from "../../../../../modules/reducer/User";

import Button from "../../../../Ui/button/Button";
import SettingsTitle from "../../SettingsTitle";
import { useDispatch } from "react-redux";

export default function TestPrediction(): ReactElement {
  const dispatch = useDispatch();
  const test = useCallback(() => {
    dispatch(testPrediction());
  }, [dispatch]);

  const testResolve = useCallback((winnerA: boolean) => {
    dispatch(testPredictionResolve(winnerA));
  }, [dispatch]);

  return <div>
    <SettingsTitle>Test prediction connection</SettingsTitle>

    <div className={'testRow'}>

      <Button onClick={test}>
        <div>Start prediction</div>
      </Button>

      <Button onClick={() => testResolve(true)}>
        <div>Set winner to A</div>
      </Button>

      <Button onClick={() => testResolve(false)}>
        <div>Set winner to B</div>
      </Button>
    </div>

    <style jsx>{`
      .testRow {
        display: flex;
        grid-gap: 2rem;
      }
    `}</style>
  </div>
}