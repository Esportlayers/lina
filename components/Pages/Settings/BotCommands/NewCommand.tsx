import { Command } from "@streamdota/shared-types";
import { ReactElement, useCallback, useDebugValue, useState } from "react";
import { useDispatch } from "react-redux";
import { createCommand } from "../../../../modules/reducer/BotCommands";
import Button from "../../../Ui/button/Button";
import Input from "../../../Ui/input/Input";
import TextArea from "../../../Ui/input/TextArea";

interface Props {
    createPreview: (message: string) => string;
    type: Command['type'];
}

export default function NewCommand({createPreview, type}: Props): ReactElement {
    const [command, setCommand] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const create = useCallback(async () => {
        if(message.length > 0 && command.length > 0) {
            dispatch(createCommand({active: true, command, message, type}));
            setCommand('');
            setMessage('');
        }
    }, [command, message, type]);

    return <>

        <div className={'activeBox'}>
        </div>
        <div>
            <Input value={command} onBlur={setCommand} />
        </div>
        <TextArea value={message}  onBlur={setMessage} />
        <div>
            <Button onClick={create}>
                Create command
            </Button>
        </div>
        <div>
        </div>
        <div className={'preview'}>{createPreview(message)}</div>
    </>;
}