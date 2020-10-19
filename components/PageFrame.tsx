import { ReactElement, ReactNode } from "react";

export default function PageFrame({children}: {children: ReactNode}): ReactElement {
    return <div className={'pageFrame'}>
        {children}

        <style jsx global>{`
            html, body {
                margin: 0;
                padding: 0;
            }

            body {
                font-size: 18px;
            }

            * {
                box-sizing: border-box;
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
            }

            :root {
                --anthrazit: #41464d;
            }
        `}</style>
    </div>
}