import { ReactElement } from "react";
import { ChromePicker } from 'react-color';
import Label from "../label/label";

interface Props {
    label: string;
    color: string;
    onChange: (color: string) => void;
}


interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

function rgbToStr({r, g, b, a}: RGBA): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function ColorPicker({label, color, onChange}: Props): ReactElement {
    return <div className={'colorPicker'}>
        <Label label={label} />
        <ChromePicker triangle={'hide'} color={color} onChange={(color) => onChange(rgbToStr(color.rgb))} />

        <style jsx>{`
            .colorPicker {
                margin-bottom: 2rem;
            }    
        `}</style>
    </div>
}