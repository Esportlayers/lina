import classNames from "classnames";
import { ReactElement } from "react";
import Label from "../label/label";

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export default function Checkbox({checked, onChange, label}: Props): ReactElement {
    return <div className={classNames('checkbox', {checked})}>
        <input type={'checkbox'} checked={Boolean(checked)} />
        <div className={'label'} onClick={() => onChange(!checked)} >
            {label && <Label label={label} />}
        </div>

        <style jsx>{`
            input {
                display: none;
            }    

            .label {
                padding-left: 2rem;
                cursor: pointer;
                position: relative;
                user-select: none;
            }

            .label::before {
                content: ' ';
                position: absolute;
                left: .25rem;
                top: -.25rem;
                bottom: 0;
                width: 1.5rem;
                height: 1.5rem;
                background-color: rgba(0,0,0,.1);
                border-radius: .25rem;
                transition: background-color 120ms ease-in-out;
            }

            .checked .label::before {
                background-color: var(--primary-accent);
            }

            .checked .label::after {
                left: .75rem;
                width: .25rem;
                height: .6rem;
                border: solid #000;
                border-width: 0 .2rem .2rem 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
                content: "";
                position: absolute;
            }

            :not(.checked) .label:hover::before {
                background-color: rgba(0,0,0,.2);
            }
        `}</style>
    </div>
}