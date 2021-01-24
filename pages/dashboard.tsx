import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import dynamic from "next/dynamic";
import { useCurrentUser } from '../modules/selector/UiSelector';
import {Wisp} from '@esportlayers/io';
import PageView from '../components/Pages/Dashboard/PageView';
import VoteOverlay from '../components/VoteOverlay';
import KeyWordListenerOverlay from '../components/KeyWordListenerOverlay/KeyWordListenerOverlay';

const Tether = dynamic(
    () => (import('@esportlayers/io')),
    { ssr: false }
);

export default function Dashboard(): ReactElement {
    const currentUser = useCurrentUser();
    return <PageFrame>
        <div className={'page'}>
            {currentUser && <Tether url={'wss://api.streamdota.com/dota-gsi/live/81f8c9aa-ed7b-47be-8f17-9ad01cb47fff'}>
                <PageView />
                <KeyWordListenerOverlay />
            </Tether>}

            {currentUser && <Wisp url={'wss://api.streamdota.com/bets/live/81f8c9aa-ed7b-47be-8f17-9ad01cb47fff'}>
                <VoteOverlay />
            </Wisp>}
        </div>

        <style jsx>{`
            .page {
                height:100vh;
                width: 100vw;
                display: flex;
                align-items: stretch;
            }    
        `}</style>
    </PageFrame>;
}
