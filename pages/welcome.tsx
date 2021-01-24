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
        {currentUser && <Tether url={'wss://api.streamdota.com/dota-gsi/live/81f8c9aa-ed7b-47be-8f17-9ad01cb47fff'}>
            <WelcomeScreen />
        </Tether>}
    </PageFrame>;
}
