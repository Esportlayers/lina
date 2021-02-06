import classNames from "classnames";
import { ReactElement } from "react";

interface Props {
    label: string;
    regularLabel?: boolean;
}

export default function Label({label, regularLabel}: Props): ReactElement {
    return <span className={classNames('label', {regularLabel})}>
        <span>{label}</span>

        <style jsx>{`
            .label {
                display: inline-flex;
                text-transform: uppercase;
                font-size: .8rem;
                margin-bottom: .25rem;
                font-weight: bold;
            }  

            .regularLabel {
                font-weight: normal;
            }
        `}</style>
    </span>;
}