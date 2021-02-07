import React, { ReactElement } from "react";
import { useCommandByIdentifier } from "../../../../../../modules/selector/BotCommands";
import { useCurrentUser } from "../../../../../../modules/selector/UiSelector";
import Description from "../../../../../Ui/description/Description";
import CommandList from "../../../BotCommands/CommandList";
import Placeholder from "../../../BotCommands/Placeholder";
import SettingsTitle from '../../../SettingsTitle';

const placeholder = [
    'total_games', 
    'games_won', 
    'games_lost',
];

export default function Chat(): ReactElement {
    const voteCommand = useCommandByIdentifier('bet');
    const user = useCurrentUser();
    
    return <div>
        <SettingsTitle>Bot Command Placeholder</SettingsTitle>
        <Description>You can use the following placeholders for your bot response messages:</Description>
        <br />
        <Placeholder placeholder={placeholder} />

        <br /><br/>
        <SettingsTitle>User Chat Commands</SettingsTitle>
        <br />
        <CommandList commandType={'dotaWinLoss'} replaceVars={{ BET_COMMAND: voteCommand && voteCommand.command }} />
    </div>;
}