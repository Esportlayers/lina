import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import { useVoteSeasons } from "../../../../modules/selector/VoteSeasons";
import Button from "../../../Ui/button/Button";
import Toggle from "../../../Ui/toggle/Toggle";
import Divider from "./Divider";
import Link from 'next/link';

interface Props {
    noDivider?: boolean;
}

export default function ActiveVoting({noDivider = false}: Props): ReactElement {
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
            {!noDivider && <Divider />}
            <Link href={'/settings/voteSystem'}>
                <a>
                    <Button small noDropShadow>
                        Configure vote system
                    </Button>
                </a>
            </Link>
        </>;
    }

    return <>
        {!noDivider && <Divider />}
        <Toggle checked={currentUser?.useBets || false} onChange={toggleUseBets} label={'Voting active'}/>

        {currentUser && currentUser.useBets && <>
            {!noDivider && <Divider />}
            <Toggle checked={currentUser.useAutomaticVoting} onChange={toggleAutomaticVoting} label={'Automatic voting'}/>
        </>}
    </>;
}