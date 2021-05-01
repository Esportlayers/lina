import React, { ReactElement } from "react";

import DeleteButton from "../../Welcome/Sections/DeleteButton";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";

export default function Account(): ReactElement {
  const user = useCurrentUser();
  return <div className={'accountPage'}>
    <h1>👋 Hey {user?.displayName}!</h1>

    <div className={'info'}>
      We hope you are happy with our tools. <br /><br />Got any question or have a suggestion? Reach out to us on <a href={'https://discord.gg/EYRQUaz'} target={'_blank'}>Discord</a>.
    </div>

    <div className={'deleteAccount'}>
      <div className={'deleteInfo'}>If you do not want to continue to use streamdota, you can just delete your account. Do not forget to remove your GSI configuration!</div>
      <DeleteButton />
    </div>


    <style jsx>{`
      h1 {
        font-size: 3rem;
        margin-bottom:60px;
      }
      .accountPage {
        padding: 2rem 2.75rem;
      }

      .deleteAccount {
        margin-top: 48px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1rem;
        line-height: 1.5rem;
      }

      .deleteInfo {
        margin-bottom: 32px;
      }
    `}</style>
  </div>
}