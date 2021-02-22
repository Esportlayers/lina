import React, { ReactElement } from 'react';
import {Wisp, getWSUrl} from '@esportlayers/io';

import KeyWordListenerOverlay from '../components/KeyWordListenerOverlay/KeyWordListenerOverlay';
import PageFrame from '../components/PageFrame';
import PageView from '../components/Pages/Dashboard/PageView';
import VoteOverlay from '../components/VoteOverlay';
import dynamic from "next/dynamic";
import { useCurrentUser } from '../modules/selector/UiSelector';

const Tether = dynamic(
    () => (import('@esportlayers/io')),
    { ssr: false }
);

export default function Dashboard(): ReactElement {
    const currentUser = useCurrentUser();
    return <PageFrame title={'Dashboard'}>
        <div className={'page'}>
            {currentUser && <Tether url={getWSUrl(process.env.API_URL + '/dota-gsi/live/' + currentUser.frameApiKey)}>
                <KeyWordListenerOverlay />
                <PageView />

                <Wisp url={getWSUrl(process.env.API_URL + '/bets/live/' + currentUser.frameApiKey)}>
                    <VoteOverlay />
                </Wisp>
            </Tether>}
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
