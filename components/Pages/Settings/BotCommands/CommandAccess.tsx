import { Command } from "@streamdota/shared-types";
import { ReactElement, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import Checkbox from "../../../Ui/toggle/Checkbox";

const rights = [
    'userAccess',
    'tier1Access',
    'tier2Access',
    'tier3Access',
    'vipAccess',
    'modAccess',
    'streamerAccess',
];

const rightNames = {
    userAccess: 'User',
    tier1Access: 'Tier1',
    tier2Access: 'Tier2',
    tier3Access: 'Tier3',
    vipAccess: 'VIP',
    modAccess: 'Mod',
    streamerAccess: 'Streamer',
}

interface Props {
    command?: Partial<Command>;
    onChange?: (data: Partial<Command>) => void;
}

export default function CommandAccess({command, onChange}: Props): ReactElement {
    const changeAccess = useCallback((right: string, value: boolean) => onChange({[right]: value}), [onChange]);

    return <div className={'access'}>
        {rights.map((right) => <Checkbox key={right} checked={Boolean(command[right])} onChange={(canAccess) => changeAccess(right, canAccess)} label={rightNames[right]}/>)}


        <style jsx>{`
            .access {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }    
        `}</style>
    </div>;
}