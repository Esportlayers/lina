import { BetRoundStats as VoteRoundStats } from "@streamdota/shared-types";
import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteVoteRound, loadVoteRounds, updateVoteRound } from "../../../../../../../modules/reducer/VoteRound";
import { deleteVoteSeason } from "../../../../../../../modules/reducer/VoteSeason";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import Button from "../../../../../../Ui/button/Button";
import Modal from "../../../../../../Ui/modal/Modal";
import ModalHeader from "../../../../../../Ui/modal/ModalHeader";
import NudgeFromBottom from "../../../../../../Ui/motion/NudgeFromBottom";


export default function ActionCellRenderer({betSeason, id, result, round, status}: VoteRoundStats): ReactElement {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();
    const onChangeWinner = useCallback(async () => {
        let newResult = currentUser?.teamBName;
        if(currentUser && currentUser.teamBName === result) {
            newResult = currentUser.teamAName
        }
        await dispatch(updateVoteRound(id, {result: newResult}));
        await dispatch(loadVoteRounds(betSeason));
    }, [currentUser, result]);

    const [showDelete, setShowDelete] = useState(false);
    const removeRound = useCallback(() => {
        setShowDelete(false);
        dispatch(deleteVoteRound(id));
    }, [dispatch]);

    if(status === 'running') {
        return <div>
            <div><a onClick={async () => {dispatch(updateVoteRound(id, {result: currentUser?.teamAName.toLowerCase(), status: 'finished'}, betSeason))}}>Set winner to {currentUser?.teamAName}</a></div>
            <div><a onClick={async () => {dispatch(updateVoteRound(id, {result: currentUser?.teamAName.toLowerCase(), status: 'finished'}, betSeason))}}>Set winner to {currentUser?.teamBName}</a></div>
        </div>
    }

    return <div>
        <div><a onClick={onChangeWinner}>Change winner</a></div>
        <div><a onClick={() => setShowDelete(true)}>Delete</a></div>

        <Modal open={showDelete}>
            <NudgeFromBottom delay={.1}>
                <ModalHeader>Delete round</ModalHeader>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.12}>
                <h4>Are you sure that you want to delete vote round #{round}?</h4>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.14}>
                <div className={'info'}>Your data will be immediately removed, there is <b>no</b> recovery.</div>
            </NudgeFromBottom>

            <div className={'buttonRow'}>
                <NudgeFromBottom delay={.23}>
                    <Button del onClick={removeRound}>Delete round</Button>
                </NudgeFromBottom>

                <NudgeFromBottom delay={.3}>
                    <Button ghost onClick={() => setShowDelete(false)}>Cancel</Button>
                </NudgeFromBottom>
            </div>
        </Modal>
        <style jsx>{`
            h4 {
                margin: 0 0 2rem 0;
            }
            .info {
                font-size: .9rem;
                margin: .5rem 0;
            }

            .buttonRow {
                display: flex;
                justify-content: space-between;
                margin-top: 3rem;
            }
        `}</style>
    </div>;
}