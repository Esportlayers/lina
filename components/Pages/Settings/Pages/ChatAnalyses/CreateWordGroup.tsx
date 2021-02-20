import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createWordGroup } from "../../../../../modules/reducer/WordGroup";
import Button from "../../../../Ui/button/Button";
import Input from "../../../../Ui/input/Input";
import Modal from "../../../../Ui/modal/Modal";
import ModalHeader from "../../../../Ui/modal/ModalHeader";
import NudgeFromBottom from "../../../../Ui/motion/NudgeFromBottom";


export default function CreateWordGroup(): ReactElement {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const onCreate = useCallback(() => {
        if(name.length > 0) {
            dispatch(createWordGroup(name));
            setName('');
            setShow(false);
        }
    }, [dispatch, name]);
    
    return <div className={'newWordGroupWrapper'}>
        <Button onClick={() => setShow(true)}>
            New word group
        </Button>

        <Modal open={show}>
            <NudgeFromBottom delay={.1}>
                <ModalHeader>New word group</ModalHeader>
            </NudgeFromBottom>

            <NudgeFromBottom delay={.2}>
                <Input autoFocus label={'Name'} value={name} onChange={setName} onEnter={onCreate} />
            </NudgeFromBottom>

            <div className={'buttonRow'}>
                <NudgeFromBottom delay={.23}>
                    <Button ghost onClick={() => {
                        setShow(false);
                        setName('');
                    }}>Cancel</Button>
                </NudgeFromBottom>

                <NudgeFromBottom delay={.3}>
                    <Button onClick={onCreate}>Create new word group</Button>
                </NudgeFromBottom>
            </div>
        </Modal>

        <style jsx>{`
            .newWordGroupWrapper {
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
    </div>
}