import { ReactElement, ReactNode } from "react";
import Head from 'next/head';

interface Props {
    children: ReactNode;
    title: string;
}

export default function PageFrame({children, title}: Props): ReactElement {
    return <div className={'pageFrame'}>

        <Head>
        <meta charSet="UTF-8"/>
        <meta name="google" content="notranslate"/>
        <meta httpEquiv="Content-Language" content="de"/>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
        <title>{title ? title + ' - ' : ''} Streamdota App</title>

        <meta property="og:site_name" content="StreamDota - Your toolbox for streaming dota"/>
        <meta property="og:title" content={'Dota bot, overlays, stats & more'}/>
        <meta property="og:description" content={'Your toolbox for streaming dota2 | Dota Win Loss Overlay | Vote System | Roshan Timer | Live Stats of Picks & Bans | and much more...'}/>
        <meta property="og:image" content={'/shared/share.png'}/>
        <meta property="og:url" content="https://app.streamdota.com/"/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="description" content="Your toolbox for streaming dota2 | Dota Win Loss Overlay | Vote System | Roshan Timer | Live Stats of Picks & Bans | and much more..."/>

        <link rel="apple-touch-icon" sizes="180x180" href="/shared/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/shared/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/shared/favicon-16x16.png" />
        <link rel="manifest" href="/shared/site.webmanifest" />
        <link rel="mask-icon" href="/shared/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/shared/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/shared/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        </Head>
        
        {children}

        <style jsx global>{`
            :root {
                --anthrazit: #41464d;
                --twitch: #772ce8;
                --primary-accent: #24d46a;
                --primary-accent-darken: #1aa551;
                --secondary-accent: #fd761c;
                --secondary-accent-darken: #c96725;
                --delete-red:#f83b3b;
            }

            html, body {
                margin: 0;
                padding: 0;
            }

            body {
                font-size: 18px;
                background: var(--anthrazit);
                color: #FFF;
            }

            * {
                box-sizing: border-box;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
            }

            a {
                color: var(--primary-accent);
                text-decoration: none;
                cursor: pointer;
                user-select: none;
            }

            a:hover {
                text-decoration: underline;
            }

            h1 {
                font-size: 5rem;
            }
            
            h2 {
                font-size: 3rem;
            }
        `}</style>
    </div>
}