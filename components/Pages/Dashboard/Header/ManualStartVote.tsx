import { useVoteValue } from "@esportlayers/io";
import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createVoteRound } from "../../../../modules/reducer/VoteRound";
import Button from "../../../Ui/button/Button";
import Divider from "./Divider";


export default function ManualStartVote(): ReactElement | null {
    const dispatch = useDispatch();
    const startVote = useCallback(() => {
        dispatch(createVoteRound());
    }, [dispatch]);
    const [voteState] = useVoteValue();
    if(!voteState || voteState?.status === 'finished') {
        return <>
            <Divider />
            <Button small noDropShadow onClick={startVote}>
                Manual start vote
            </Button>
        </>;
    }

    return null;
}