import React, { ReactElement } from 'react';
import Router from 'next/router';
import PageFrame from '../components/PageFrame';
import LoginInfo from '../components/LoginInfo';

export default function Home(): ReactElement {
  if(process.browser) {
    if(localStorage.getItem('jwt')) {
        Router.push('/grandCentralTerminal');
    } else {
        location.href = `${process.env.API_URL}/auth/twitch?callbackURL=${location.origin + '/auth'}`;
    }
  }

  return <PageFrame title={'Login'}>
    <LoginInfo />
  </PageFrame>;
}
