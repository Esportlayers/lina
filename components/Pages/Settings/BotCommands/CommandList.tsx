import { ReactElement, useCallback, useState, useMemo } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { Command } from "@streamdota/shared-types";
import { useUserCommands } from "../../../../modules/selector/BotCommands";
import { createCommand, updateCommand } from "../../../../modules/reducer/BotCommands";
import Label from "../../../Ui/label/label";
import Input from "../../../Ui/input/Input";
import TextArea from "../../../Ui/input/TextArea";
import Checkbox from "../../../Ui/toggle/Checkbox";
import Loader from "../../../Ui/loader/Loader";
import CommandAccess from "./CommandAccess";

const replace = {
    UPTIME: '4 Stunden und 20 Minuten',
    USER: 'griefcode',
    TOTAL_GAMES: '5',
    GAMES_WON: '3',
    GAMES_LOST: '2',
    WINNER: 'A',
    TOPLIST_STATS: '1. griefcode (5/8) 2. shokztv (5/9) ...',
    USER_BETS_CORRECT: '1',
    USER_BETS_WRONG: '1',
    USER_BETS_TOTAL: '2',
    USER_BETS_ACCURACY: '50%'

}

function createPreview(msg: string, vars: {[x: string]: string}): string {
    let replaced = msg;

    for(const [key, value] of Object.entries({...replace, ...vars})) {
        const regex = new RegExp(`{${key}}`, "g");
        replaced = replaced.replace(regex, value);
    }

    return replaced;
}

interface Props {
    commandType?: Command['type'];
    replaceVars?: {[x: string]: string};
    canCreate?: boolean;
}

export default function CommandList({commandType = 'default', replaceVars = {}, canCreate=true}: Props): ReactElement {
    const commands = useUserCommands(commandType);
    const dispatch = useDispatch();
    const [cmd, setCmd] = useState('');
    const [msg, setMsg] = useState('');
    const [act, setAct] = useState(false);

    console.log(commands);

    const create = useCallback(async () => {
        if(msg.length > 0 && cmd.length > 0) {
            dispatch(createCommand({active: act, command: cmd, message: msg, type: commandType}));
            setCmd('');
            setMsg('');
        }
    }, [act, cmd, msg]);

    if(commands) {
        return <div className={'commandsGrid'}>
            <div className={'label'}><Label label={'Aktiv'} /></div>
            <div className={'label'}><Label label={'Command'} /></div>
            <div className={'label'}><Label label={'Response'} /></div>
            <div className={'label'}><Label label={'Access'} /></div>
            <div className={'label'}></div>
            <div className={'label'}><Label label={'Preview'} /></div>

            {commands.map(({active, id, command, message, noResponse, deleteAble, ...props}) => <React.Fragment key={id}>
                <div className={'activeBox'}>
                    <Checkbox checked={active} onChange={async (active) => dispatch(updateCommand(id, {active}))}/>
                </div>
                <div>
                    <Input value={command} onBlur={async (command) => dispatch(updateCommand(id, { command }))} />
                </div>
                <TextArea value={message} disabled={noResponse} onBlur={async (message) => dispatch(updateCommand(id, { message }))} />
                <div>
                    <CommandAccess command={props} onChange={async (command) => dispatch(updateCommand(id, command))} />
                </div>
                <div>
                </div>
                <div className={'preview'}>{createPreview(message, replaceVars)}</div>
            </React.Fragment>)}

            <style jsx>{`
                .activeBox {
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .label {
                    margin-bottom: -15px;
                    margin-top: 10px;
                }
                .commandsGrid {
                    display: grid;
                    grid-template-columns: max-content 170px 330px 300px 60px 1fr;
                    grid-column-gap: 20px;
                    grid-row-gap: 15px;
                }
                .createButton {
                    justify-self: flex-end;
                }

                .preview {
                    font-size: .9rem;
                }
            `}</style>
        </div>;
    }

    return <Loader />;

}