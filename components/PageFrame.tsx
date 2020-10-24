import { ReactElement, ReactNode } from "react";

export default function PageFrame({children}: {children: ReactNode}): ReactElement {
    return <div className={'pageFrame'}>
        {children}

        <style jsx global>{`
            :root {
                --anthrazit: #41464d;
                --twitch: #772ce8;
                --primary-accent: #24d46a;
                --secondary-accent: #e8772c;
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
            }

            a:hover {
                text-decoration: underline;
            }
        `}</style>
    </div>
}