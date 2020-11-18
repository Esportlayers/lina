import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Container({children}: Props): ReactElement {
    return <div className={'container'}>
        {children}

        <style jsx>{`
            .container {
                max-width: 1000px;
                width: 100%;
                margin: 20vh auto;
                text-align: center;
            }
        `}</style>
    </div>;
}