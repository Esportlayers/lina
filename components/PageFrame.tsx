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