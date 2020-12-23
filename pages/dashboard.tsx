import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import dynamic from "next/dynamic";
import { useCurrentUser } from '../modules/selector/UiSelector';
import {getWSUrl} from '@esportlayers/io';
import PageView from '../components/Pages/Dashboard/PageView';

const Tether = dynamic(
    () => (import('@esportlayers/io').then((mod) => mod.Tether)),
    { ssr: false }
);

export default function Dashboard(): ReactElement {
    const currentUser = useCurrentUser();
    return <PageFrame>
        {currentUser && <Tether url={getWSUrl(process.env.API_URL + '/dota-gsi/live/' + currentUser.frameApiKey)}>
            <PageView />
        </Tether>}
    </PageFrame>;
}
