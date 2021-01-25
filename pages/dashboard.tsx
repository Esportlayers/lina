import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import dynamic from "next/dynamic";
import { useCurrentUser } from '../modules/selector/UiSelector';
import {getWSUrl, Wisp} from '@esportlayers/io';
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
            {currentUser && <Tether url={getWSUrl(process.env.API_URL + '/dota-gsi/live/' + currentUser.frameApiKey)}>
                <PageView />
                <KeyWordListenerOverlay />
            </Tether>}

            {currentUser && <Wisp url={getWSUrl(process.env.API_URL + '/bets/live/' + currentUser.frameApiKey)}>
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
