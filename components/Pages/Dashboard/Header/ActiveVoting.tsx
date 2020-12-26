import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import { useCurrentVoteRound } from "../../../../modules/selector/VoteRound";
import { useVoteSeasons } from "../../../../modules/selector/VoteSeasons";
import Button from "../../../Ui/button/Button";
import Toggle from "../../../Ui/toggle/Toggle";
import Divider from "./Divider";


export default function ActiveVoting(): ReactElement {
    const seasons = useVoteSeasons();
    const [automatic, setAutomatic] = useState(false);
    const currentUser = useCurrentUser();
    const dispatch = useDispatch();

    const onToggle = useCallback((useBets) => {
        dispatch(updateCurrentUser({useBets}));
    }, [dispatch])

    if(!seasons) {
        return <>
            <Divider />
            <Button small noDropShadow>
                Configure Voting
            </Button>
        </>;
    }
    return <>
        <Divider />
        <Toggle checked={currentUser.useBets} onChange={onToggle} label={'Voting active'}/>

        {currentUser.useBets && <>
            <Divider />
            <Toggle checked={automatic} onChange={setAutomatic} label={'Automatic voting'}/>
        </>}
    </>;
}