import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../../modules/reducer/User";
import Button from "../../../Ui/button/Button";
import Modal from "../../../Ui/modal/Modal";
import ModalHeader from "../../../Ui/modal/ModalHeader";
import NudgeFromBottom from "../../../Ui/motion/NudgeFromBottom";

export default function DeleteButton(): ReactElement {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const dispatch = useDispatch();

    const removeAccount = useCallback(async () => {
            if(await dispatch(deleteUser())) {
                location.href = 'https://streamdota.com';
            }
        },
        [dispatch],
    )

    return <>
        <NudgeFromBottom delay={.3}>
            <Button ghost onClick={() => setShowDeleteDialog(true)}>
                Delete my account
            </Button>
        </NudgeFromBottom>

        <Modal open={showDeleteDialog}>
            <NudgeFromBottom delay={.1}>
                <ModalHeader>Delete My Account</ModalHeader>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.12}>
                <h4>Are you sure that you want to delete your account?</h4>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.14}>
                <div className={'info'}>Your data will be immediately removed, there is <b>no</b> recovery.</div>
            </NudgeFromBottom>
            <NudgeFromBottom delay={.16}>
                <div className={'info'}>You can always create a new account and enjoy our features!</div>
            </NudgeFromBottom>

            <div className={'buttonRow'}>
                <NudgeFromBottom delay={.23}>
                    <Button del onClick={removeAccount}>Delete Account</Button>
                </NudgeFromBottom>

                <NudgeFromBottom delay={.3}>
                    <Button ghost onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
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
    </>;
}