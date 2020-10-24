import React, { ReactElement } from 'react';
import PageFrame from '../components/PageFrame';
import WelcomeScreen from '../components/Welcome/WelcomeScreen';
import { useCurrentUser } from '../modules/selector/UiSelector';

export default function Welcome(): ReactElement {
    const currentUser = useCurrentUser();

    return <PageFrame>
        <WelcomeScreen />
    </PageFrame>;
}
