import React, { ReactElement } from "react";

import CommandList from "../BotCommands/CommandList";
import Description from "../../../Ui/description/Description";
import Placeholder from "../BotCommands/Placeholder";
import SettingsTitle from "../SettingsTitle";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";

export default function BotCommands(): ReactElement {
  const user = useCurrentUser();

  return (
    <div className={"page"}>
      <SettingsTitle>Bot Command Placeholder</SettingsTitle>
      <Description>
        You can use the following placeholders for your bot response messages:
      </Description>
      <br />
      <Placeholder placeholder={[]} />

      <br />
      <br />
      <SettingsTitle>Chat Commands</SettingsTitle>
      <br />
      <CommandList
        commandType={"default"}
        replaceVars={{ USER: user?.displayName }}
      />

      <style jsx>{`
        .page {
          padding: 2rem 2.75rem;
        }
      `}</style>
    </div>
  );
}
