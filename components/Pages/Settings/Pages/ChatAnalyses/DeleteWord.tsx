import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWord } from "../../../../../modules/reducer/Word";
import Button from "../../../../Ui/button/Button";
import Modal from "../../../../Ui/modal/Modal";
import ModalHeader from "../../../../Ui/modal/ModalHeader";
import NudgeFromBottom from "../../../../Ui/motion/NudgeFromBottom";

interface Props {
    id: number;
    name: string;
    word: string;
}

export default function DeleteWord({id, name, word}: Props): ReactElement {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const onDelete = useCallback(() => {
        dispatch(deleteWord(id));
        setShow(false);
    }, [dispatch, id]);
    
    return <div className={'wrapper'}>
        <Button small ghost onClick={() => setShow(true)}>Delete word</Button>
        <Modal open={show}>
            <NudgeFromBottom delay={.1}>
                <ModalHeader>Delete word</ModalHeader>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.12}>
                <h4>You are deleting the word "{word}" of the group "{name}".</h4>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.14}>
                <div className={'info'}>Any data connected to the season will be immediately removed, there is <b>no</b> recovery.</div>
            </NudgeFromBottom>

            <div className={'buttonRow'}>
                <NudgeFromBottom delay={.23}>
                    <Button del onClick={onDelete}>Delete word</Button>
                </NudgeFromBottom>

                <NudgeFromBottom delay={.3}>
                    <Button ghost onClick={() => setShow(false)}>Cancel</Button>
                </NudgeFromBottom>
            </div>
        </Modal>

        <style jsx>{`
            .wrapper {
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
    </div>;
}