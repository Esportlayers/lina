import { ReactElement } from "react";
import Label from "../label/label";
import Radio from "../toggle/Radio";

interface Props {
    checked: string;
    regularLabel?: boolean;
    label: string;
    setChecked: (checked: string) => void;
    options: Array<{
        value: string;
        name: string;
    }>;
}

export default function RadioGroup({checked, label, regularLabel, options, setChecked}: Props): ReactElement {
    return <div className={'radioGroup'}>
        <Label label={label} />
        <div className={'responsiveRow'}>
            {options.map(({value, name}) => <div className={'item'}>
                <Radio checked={checked === value} onClick={() => setChecked(value)} label={name} regularLabel/>
            </div>)}
        </div>

        <style jsx>{`
            .responsiveRow {
                margin-top: .5rem;
                display: flex;
                flex-wrap: wrap;
                max-width: 70vw;
            }    

            .item {
                margin-right: .75rem;
                margin-bottom: .5rem;
            }
        `}</style>
    </div>;
}