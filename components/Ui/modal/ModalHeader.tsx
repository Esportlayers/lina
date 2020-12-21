import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function ModalHeader({children}: Props): ReactElement {
    return <h2>
        {children}

        <style jsx>{`
            h2 {
                margin: 0;
                margin-bottom: 1rem;
                color: var(--primary-accent);
                text-transform: uppercase;
                font-size: 2rem;
            }    
        `}</style>
    </h2>;
}