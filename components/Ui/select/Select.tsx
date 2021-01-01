import { ReactElement } from "react";
import Label from "../label/label";


interface Props {
    selected: string;
    onSelect: (value: string) => void;
    options: Array<{
        value: string;
        name: string;
    }>;
    label: string;
}

export default function Select({label, selected, onSelect, options}: Props): ReactElement {
    return <label>
        <Label label={label} />
        <br />
        <span className={'selectWrapper'}>
            <select value={selected} onChange={(e) => onSelect(e.target.value)}>
                {options.map(({name, value}) => <option key={value} value={value}>{name}</option>)}
            </select>

            <span className={'caret'}>
                <svg viewBox="0 0 320 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M143 200.3L7.0002 64.3C-2.3998 54.9 -2.3998 39.7 7.0002 30.4L29.6002 7.8C39.0002 -1.6 54.2002 -1.6 63.5002 7.8L159.9 104.2L256.3 7.8C265.7 -1.6 280.9 -1.6 290.2 7.8L312.8 30.4C322.2 39.8 322.2 55 312.8 64.3L176.8 200.3C167.6 209.7 152.4 209.7 143 200.3V200.3Z" fill="#AAA"/>
                </svg>
            </span>
        </span>

        <style jsx>{`
            label {
                user-select: none;
                cursor: pointer;
            }

            .selectWrapper {
                position: relative;
            }

            select {
                width: 15rem;;
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

            label:hover select {
                background-color: rgba(0,0,0,.2);
            }

            select:focus {
                outline: none !important;
                border-color: var(--primary-accent);
                box-shadow: 0 0 5px var(--primary-accent);
            }

            select::-ms-expand {
                display: none;
            }

            .caret {
                position: absolute;
                right: .5rem;
                width: 1rem;
                top: 50%;
                transform: translateY(-50%);
            }
        `}</style>
    </label>;
}