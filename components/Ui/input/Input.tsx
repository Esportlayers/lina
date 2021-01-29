import { ReactElement, useEffect, useState } from "react";
import Label from "../label/label";

interface Props {
    autoFocus?: boolean;
    label?: string;
    value: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    type?: HTMLInputElement['type'];
}

export default function Input({autoFocus, label, onBlur, onChange, type = 'text', value}: Props): ReactElement {
    const [val, setVal] = useState(value);
    useEffect(() => setVal(value), [value]);
    return <label>
        {label && <>
            <Label label={label} />
            <br />
        </>}
        <span className={'inputWrapper'}>
            <input autoFocus={autoFocus} type={type} value={val} onChange={(e) => {
                setVal(e.target.value);
                onChange && onChange(e.target.value)
            }} onBlur={(e) => onBlur && onBlur(e.target.value)} />
        </span>

        <style jsx>{`
            label {
                position: relative;
            }    

            input {
                width: 100%;
                appearance: none;
                border: none;
                border-radius: .1rem;
                padding: .75rem .5rem;
                font-size: .9rem;
                background-color: rgba(0,0,0,.1);
                color: #FFF;
                outline: none;
                padding-right: 2rem;
                border: 1px solid transparent;
                transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out, background-color 240ms ease-in-out;
            }

            label:hover input, input:focus {
                background-color: rgba(0,0,0,.2);
            }

            input:focus {
                outline: none !important;
                border-color: var(--primary-accent);
                box-shadow: 0 0 5px var(--primary-accent);
            }
        `}</style>
    </label>
}