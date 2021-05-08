import { ReactElement, useCallback, useEffect } from "react";

import Button from "../../../../Ui/button/Button";
import Description from "../../../../Ui/description/Description";
import SettingsTitle from "../../SettingsTitle";
import { accessUserTwitchPredictions } from "../../../../../modules/reducer/User";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface Props {
  hasPredictionAccess?: boolean;
}
export default function AuthorizeOAuthScope({ hasPredictionAccess }: Props): ReactElement {

  const onRequest = useCallback(() => {
    location.href = `${process.env.API_URL}/auth/twitchPredictions?callbackURL=${location.origin + '/settings/predictions'}`;
  }, []);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query['code']) {
      dispatch(accessUserTwitchPredictions(router.query['code'] as string));
      router.push('/settings/predictions');
    }
  }, [router.query]);

  return <div className={'accessInfo'}>
    <SettingsTitle>Access to Twitch</SettingsTitle>
    <Description>streamdota.com requires specific access to your twitch account in order to start predictions. Click the following button to grant us access.
     You can revoke the access any time at <a href={'https://www.twitch.tv/settings/connections'} target={'_blank'} rel={'noopener noreferrer'}>Twitch Account Connections</a>.
    </Description>

    <br />

    {!hasPredictionAccess && <Button onClick={onRequest}>Grant access</Button>}
    {hasPredictionAccess && <div>Access granted</div>}

    <style jsx>{`
      .accessInfo {
        max-width: 600px;
      }
    `}</style>
  </div>;
}