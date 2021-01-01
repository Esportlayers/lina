import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import { useVoteSeasons } from "../../../../modules/selector/VoteSeasons";
import Button from "../../../Ui/button/Button";
import Toggle from "../../../Ui/toggle/Toggle";
import Divider from "./Divider";
import Link from 'next/link';

export default function ActiveVoting(): ReactElement {
    const seasons = useVoteSeasons();
    const currentUser = useCurrentUser();
    const dispatch = useDispatch();

    const toggleUseBets = useCallback((useBets) => {
        dispatch(updateCurrentUser({useBets}));
    }, [dispatch]);

    const toggleAutomaticVoting = useCallback((useAutomaticVoting) => {
        dispatch(updateCurrentUser({useAutomaticVoting}));
    }, [dispatch])

    if(!seasons) {
        return <>
            <Divider />
            <Link href={'/settings/voteSystem'}>
                <Button small noDropShadow>
                    Configure vote system
                </Button>
            </Link>
        </>;
    }
    return <>
        <Divider />
        <Toggle checked={currentUser.useBets} onChange={toggleUseBets} label={'Voting active'}/>

        {currentUser.useBets && <>
            <Divider />
            <Toggle checked={currentUser.useAutomaticVoting} onChange={toggleAutomaticVoting} label={'Automatic voting'}/>
        </>}
    </>;
}