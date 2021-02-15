import { AppProps } from 'next/app';
import { FC } from "react";
import { wrapper } from '../modules/Store';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as Sentry from "@sentry/react";

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    LogRocket.init('07xsnw/streamdota');
    setupLogRocketReact(LogRocket);
    if(process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0) {
        Sentry.init({dsn: process.env.SENTRY_DSN});
    }
}

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);