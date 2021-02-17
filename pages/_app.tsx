import { AppProps } from 'next/app';
import { FC } from "react";
import { wrapper } from '../modules/Store';
import * as Sentry from "@sentry/react";

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0) {
    Sentry.init({dsn: process.env.SENTRY_DSN});
}

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <Sentry.ErrorBoundary fallback={"An error has occurred. This error was reported. Please try reloading the page!"}>
        <Component {...pageProps} />
    </Sentry.ErrorBoundary>
);

export default wrapper.withRedux(WrappedApp);