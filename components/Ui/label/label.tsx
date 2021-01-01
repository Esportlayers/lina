import { ReactElement } from "react";

interface Props {
    label: string;
}

export default function Label({label}: Props): ReactElement {
    return <span className={'label'}>
        <span>{label}</span>

        <style jsx>{`
            .label {
                display: inline-flex;
                text-transform: uppercase;
                font-size: .8rem;
                margin-bottom: .25rem;
                font-weight: bold;
            }  
        `}</style>
    </span>;
}