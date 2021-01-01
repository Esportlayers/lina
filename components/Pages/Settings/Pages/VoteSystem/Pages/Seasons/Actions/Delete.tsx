import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteVoteSeason } from "../../../../../../../../modules/reducer/VoteSeason";
import Button from "../../../../../../../Ui/button/Button";
import Modal from "../../../../../../../Ui/modal/Modal";
import ModalHeader from "../../../../../../../Ui/modal/ModalHeader";
import NudgeFromBottom from "../../../../../../../Ui/motion/NudgeFromBottom";

interface Props {
    id: number;
    name: string;
}

export default function Delete({id, name}: Props): ReactElement {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const onDelete = useCallback(() => {
        dispatch(deleteVoteSeason(id));
        setShow(false);
    }, [dispatch, id]);

    return <>
        <Button ghost onClick={() => setShow(true)}>Delete</Button>
        <Modal open={show}>
            <NudgeFromBottom delay={.1}>
                <ModalHeader>Delete Season</ModalHeader>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.12}>
                <h4>You are deleting the vote season "{name}".</h4>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.14}>
                <div className={'info'}>Any data connected to the season will be immediately removed, there is <b>no</b> recovery.</div>
            </NudgeFromBottom>

            <div className={'buttonRow'}>
                <NudgeFromBottom delay={.23}>
                    <Button del onClick={onDelete}>Delete Season</Button>
                </NudgeFromBottom>

                <NudgeFromBottom delay={.3}>
                    <Button ghost onClick={() => setShow(false)}>Cancel</Button>
                </NudgeFromBottom>
            </div>
        </Modal>

        <style jsx>{`
            .newSeasonWrapper {
                display: flex;
            }

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
    </>;
}