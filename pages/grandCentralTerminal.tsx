import React, { ReactElement, useEffect } from 'react';
import PageFrame from '../components/PageFrame';
import LoginInfo from '../components/LoginInfo';
import { useCurrentUser } from '../modules/selector/UiSelector';
import { useRouter } from 'next/router';

export default function GrandCentralTerminal(): ReactElement {
    const currentUser = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if(currentUser) {
            if(!currentUser.gsiConnected) {
                router.push('/welcome');
            } else {
                router.push('/dashboard')
            }
            
        }
    }, [currentUser])

    return <PageFrame>
        <LoginInfo />
    </PageFrame>;
}
