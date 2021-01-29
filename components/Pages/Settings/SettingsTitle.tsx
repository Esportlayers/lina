import { ReactElement, ReactNode } from "react";


interface Props {
    children: ReactNode;
}

export default function SettingsTitle({children}: Props): ReactElement {
    return <h1>
        {children}

        <style jsx>{`
            h1 {
                font-size: 1.1rem;
                margin-top: 0;
                position: relative;
            }    

            h1::before {
                position: absolute;
                content: ' ';
                top: 50%;
                transform: translateY(-50%);
                width: .75rem;
                height: .25rem;
                background-color: var(--secondary-accent);
                left: -1.25rem;
            }
        `}</style>
    </h1>
}