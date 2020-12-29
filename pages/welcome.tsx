import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import WelcomeScreen from '../components/Pages/Welcome/WelcomeScreen';
import dynamic from "next/dynamic";
import { useCurrentUser } from '../modules/selector/UiSelector';
import {getWSUrl} from '@esportlayers/io';

const Tether = dynamic(
    () => (import('@esportlayers/io')),
    { ssr: false }
);


export default function Welcome(): ReactElement {
    const currentUser = useCurrentUser();
    return <PageFrame>
        {currentUser && <Tether url={getWSUrl(process.env.API_URL + '/dota-gsi/live/' + currentUser.frameApiKey)}>
            <WelcomeScreen />
        </Tether>}
    </PageFrame>;
}
