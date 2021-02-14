import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import { useVoteSeasons } from "../../../../modules/selector/VoteSeasons";
import Button from "../../../Ui/button/Button";
import Toggle from "../../../Ui/toggle/Toggle";
import Divider from "./Divider";
import Link from 'next/link';
import { getWSUrl, Wisp } from "@esportlayers/io";
import ManualStartVote from "./ManualStartVote";

interface Props {
    noDivider?: boolean;
    withManualStart?: boolean;
}

export default function ActiveVoting({noDivider = false, withManualStart = false}: Props): ReactElement {
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
            {withManualStart && currentUser && <Wisp url={getWSUrl(process.env.API_URL + '/bets/live/' + currentUser.frameApiKey)}>
                <ManualStartVote />
            </Wisp>}
        </>}
    </>;
}