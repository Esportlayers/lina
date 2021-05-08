import React, { ReactElement } from 'react';

import LoginInfo from '../components/LoginInfo';
import PageFrame from '../components/PageFrame';
import Router from 'next/router';

export default function Home(): ReactElement {
  if (process.browser) {
    if (localStorage.getItem('jwt')) {
      Router.push('/grandCentralTerminal');
    } else {
      location.href = `${process.env.API_URL}/auth/twitch?callbackURL=${location.origin + '/auth'}`;
    }
  }

  return <PageFrame title={'Login'}>
    <LoginInfo />
  </PageFrame>;
}
