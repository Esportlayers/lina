import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import Toggle from "../../../Ui/toggle/Toggle";
import Divider from "./Divider";


export default function UseKeywordListener(): ReactElement {
    const currentUser = useCurrentUser();
    const dispatch = useDispatch();

    const toggleKeywordListener = useCallback((useKeywordListener) => {
        dispatch(updateCurrentUser({useKeywordListener}));
    }, [dispatch]);

    return <>
        <Divider />
        <Toggle checked={currentUser?.useKeywordListener || false} onChange={toggleKeywordListener} label={'Keyword listener active'}/>
    </>;
}