import classNames from "classnames";
import { ReactElement } from "react";
import Label from "../label/label";

interface Props {
    checked: boolean;
    regularLabel?: boolean;
    onClick: () => void;
    label?: string;
}

export default function Radio({checked, regularLabel, onClick, label}: Props): ReactElement {
    return <div className={classNames('radio', {checked})}>
        <input type={'radio'} checked={Boolean(checked)} onChange={() => false} />
        <div className={classNames('label', {noLabel: !label})} onClick={onClick} >
            {label && <Label label={label} regularLabel/>}
        </div>

        <style jsx>{`
            .radio {
                margin-bottom: .5rem;
                margin-right: 1.5rem; 
            }

            input {
                display: none;
            }    

            .label {
                padding-left: 2.25rem;
                cursor: pointer;
                position: relative;
                user-select: none;
            }

            .label::before {
                content: ' ';
                position: absolute;
                left: .25rem;
                bottom: 0;
                width: 1.5rem;
                height: 1.5rem;
                border-radius: .75rem;
                background-color: rgba(0,0,0,.1);
                transition: background-color 120ms ease-in-out;
            }

            .checked .label::before {
                background-color: var(--primary-accent);
            }

            .checked .label::after {
                left: .63rem;
                width: .75rem;
                height: .75rem;
                border-radius: 50%;
                background-color:#000;
                content: "";
                position: absolute;
                top: .4rem;
            }

            :not(.checked) .label:hover::before {
                background-color: rgba(0,0,0,.2);
            }

            .checked .noLabel::after {
                top: 0rem;
            }
        `}</style>
    </div>
}