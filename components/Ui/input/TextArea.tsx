import { ReactElement, useEffect, useState } from "react";
import Label from "../label/label";

interface Props {
    autoFocus?: boolean;
    label?: string;
    value: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

export default function TextArea({autoFocus, disabled, label, onBlur, onChange, value}: Props): ReactElement {
    const [val, setVal] = useState(value);
    useEffect(() => setVal(value), [value]);
    return <label>
        {label && <>
            <Label label={label} />
            <br />
        </>}
        <span className={'inputWrapper'}>
            <textarea disabled={disabled} autoFocus={autoFocus}value={val} onChange={(e) => {
                setVal(e.target.value);
                onChange && onChange(e.target.value)
            }} onBlur={(e) => onBlur && onBlur(e.target.value)} />
        </span>

        <style jsx>{`
            label {
                position: relative;
            }    

            textarea {
                width: 100%;
                appearance: none;
                border: none;
                border-radius: .1rem;
                padding: .75rem .5rem;
                font-size: .8rem;
                background-color: rgba(0,0,0,.1);
                color: #FFF;
                outline: none;
                padding-right: 2rem;
                border: 1px solid transparent;
                min-height: 5rem;
                transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out, background-color 240ms ease-in-out;
            }

            textarea[disabled] {
                pointer-events: none;
                background-color: rgba(0,0,0,.05);
            }

            label:hover input, input:focus {
                background-color: rgba(0,0,0,.2);
            }

            textarea:focus {
                outline: none !important;
                border-color: var(--primary-accent);
                box-shadow: 0 0 5px var(--primary-accent);
            }
        `}</style>
    </label>
}