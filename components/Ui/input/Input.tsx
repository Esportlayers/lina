import { ReactElement, useEffect, useState } from "react";
import Label from "../label/label";

interface Props<T> extends Omit<HTMLFormElement, 'type' | 'value'> {
    autoFocus?: boolean;
    label?: string;
    value: T;
    onChange?: (value: T) => void;
    onBlur?: (value: T) => void;
    type?: HTMLInputElement['type'];
}

export default function Input<T extends any>({autoFocus, label, onBlur, onChange, type = 'text', value, ...props}: Props<T>): ReactElement {
    const [val, setVal] = useState<T>(value);
    useEffect(() => setVal(value), [value]);
    return <label>
        {label && <>
            <Label label={label} />
            <br />
        </>}
        <span className={'inputWrapper'}>
            <input autoFocus={autoFocus} type={type} value={val + ''} onChange={(e) => {
                setVal(e.target.value as T);
                onChange && onChange(e.target.value as T)
            }} onBlur={(e) => onBlur && onBlur(e.target.value as T)} {...props} />
        </span>

        <style jsx>{`
            label {
                position: relative;
                width: 100%;
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