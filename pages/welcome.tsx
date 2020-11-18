import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import { initialState, reducer } from '../components/Websocket/State';
import WelcomeScreen from '../components/Welcome/WelcomeScreen';
import { useCurrentUser } from '../modules/selector/UiSelector';
import dynamic from "next/dynamic";


const ContextProvider = dynamic(
    () => import('../components/Websocket/Context'),
    { ssr: false }
);


export default function Welcome(): ReactElement {
    const currentUser = useCurrentUser();

    return <PageFrame>
        <ContextProvider initialState={initialState} reducer={reducer} path={'/dota-gsi/live'}>
            <WelcomeScreen />
        </ContextProvider>
    </PageFrame>;
}
