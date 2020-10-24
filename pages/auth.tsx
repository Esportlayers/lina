
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { Dispatch, useEffect } from 'react';
import { useRouter } from "next/router";
import PageFrame from '../components/PageFrame';
import LoginInfo from '../components/LoginInfo';
import { authUser } from '../modules/reducer/User';

async function handleAuthRoutine(dispatch: Dispatch<any>, code: string): Promise<void> {
    const success = (await dispatch(authUser(code))) as unknown as boolean;
    Router.push(success ? '/grandCentralTerminal' : '/');
}

const Auth = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if(process.browser && router.query.code) {
            handleAuthRoutine(dispatch, router.query.code as unknown as string);
        }
    }, [router]);
    
    return <PageFrame>
        <LoginInfo />
    </PageFrame>;
}

export default Auth;