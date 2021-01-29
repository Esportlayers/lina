import React, { ReactElement } from "react";
import { useCommandByIdentifier } from "../../../../../../modules/selector/BotCommands";
import { useCurrentUser } from "../../../../../../modules/selector/UiSelector";
import Description from "../../../../../Ui/description/Description";
import CommandList from "../../../BotCommands/CommandList";
import Placeholder from "../../../BotCommands/Placeholder";
import SettingsTitle from '../../../SettingsTitle';

const placeholder = [
    'bet_command',
    'winner',
    'toplist_stats',
    'user_bets_correct',
    'user_bets_wrong',
    'user_bets_total',
    'user_bets_accuracy',
    'team_a',
    'team_b'
];

export default function Chat(): ReactElement {
    const voteCommand = useCommandByIdentifier('bet');
    const user = useCurrentUser();
    
    return <div>
        <SettingsTitle>Bot Command Placeholder</SettingsTitle>
        <Description>You can use the following placeholders for your bot response messages:</Description>
        <br />
        <Placeholder placeholder={placeholder} />

        <br /><br />
        <SettingsTitle>Limited Chat Commands</SettingsTitle>
        <Description>Chat commands that should be limited. May only you or your moderators can access these commands.<br/>You may disable these commands if you do not start votes manually.</Description>
        <br />
        <CommandList
            commandType={'betting_streamer'}
            replaceVars={{ BET_COMMAND: voteCommand && voteCommand.command, TEAM_A: user.teamAName, TEAM_B: user.teamBName }}
            canCreate={false}
        />

        <br /><br/>
        <SettingsTitle>User Chat Commands</SettingsTitle>
        <Description>Normal chat commands for votings:</Description>
        <br />
        <CommandList commandType={'betting_user'} replaceVars={{ BET_COMMAND: voteCommand && voteCommand.command }} />
    </div>;
}