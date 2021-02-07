import { BetRoundStats as VoteRoundStats, DotaStats } from "@streamdota/shared-types";
import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { removeGame } from "../../../../../../../modules/reducer/DotaStats";
import Button from "../../../../../../Ui/button/Button";
import Modal from "../../../../../../Ui/modal/Modal";
import ModalHeader from "../../../../../../Ui/modal/ModalHeader";
import NudgeFromBottom from "../../../../../../Ui/motion/NudgeFromBottom";
import DateCellRenderer from "../../../../../../Ui/table/DateCellRenderer";


export default function ActionCellRenderer({date}: DotaStats): ReactElement {
    const dispatch = useDispatch();
    const [showDelete, setShowDelete] = useState(false);
    const removeRound = useCallback(() => {
        setShowDelete(false);
        dispatch(removeGame(date));
    }, [dispatch]);

    return <div>
        <div><a onClick={() => setShowDelete(true)}>Delete</a></div>

        <Modal open={showDelete}>
            <NudgeFromBottom delay={.1}>
                <ModalHeader>Delete game <DateCellRenderer ts={date} /></ModalHeader>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.12}>
                <h4>Are you sure that you want to delete the game?</h4>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.14}>
                <div className={'info'}>Your data will be immediately removed, there is <b>no</b> recovery.</div>
            </NudgeFromBottom>

            <div className={'buttonRow'}>
                <NudgeFromBottom delay={.23}>
                    <Button del onClick={removeRound}>Delete game</Button>
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