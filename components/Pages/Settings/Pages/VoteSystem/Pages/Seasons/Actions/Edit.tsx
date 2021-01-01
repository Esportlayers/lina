import { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { patchVoteSeason } from "../../../../../../../../modules/reducer/VoteSeason";
import Button from "../../../../../../../Ui/button/Button";
import Input from "../../../../../../../Ui/input/Input";
import Modal from "../../../../../../../Ui/modal/Modal";
import ModalHeader from "../../../../../../../Ui/modal/ModalHeader";
import NudgeFromBottom from "../../../../../../../Ui/motion/NudgeFromBottom";

interface Props {
    id: number;
    name: string;
}

export default function Edit({id, name: initialName}: Props): ReactElement {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(initialName);
    useEffect(() => setName(initialName), [initialName]);
    const dispatch = useDispatch();
    const onSave = useCallback(() => {
        dispatch(patchVoteSeason(id, {name}));
        setShow(false);
    }, [dispatch, name]);

    return <>
        <Button onClick={() => setShow(true)}>Edit</Button>

        <Modal open={show}>
            <NudgeFromBottom delay={.1}>
                <ModalHeader>Edit {initialName}</ModalHeader>
            </NudgeFromBottom>

            <NudgeFromBottom delay={.2}>
                <Input autoFocus label={'Name'} value={name} onChange={setName} />
            </NudgeFromBottom>

            <div className={'buttonRow'}>
                <NudgeFromBottom delay={.23}>
                    <Button ghost onClick={() => {
                        setShow(false);
                        setName(initialName);
                    }}>Cancel</Button>
                </NudgeFromBottom>

                <NudgeFromBottom delay={.3}>
                    <Button onClick={onSave}>Save</Button>
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

            .buttonRow {
                display: flex;
                justify-content: space-between;
                margin-top: 3rem;
            }
        `}</style>
    </>;
}