import { ReactElement, useMemo } from "react";
import { useGoogleFont } from "../../../modules/selector/GoogleFont";
import RadioGroup from "./RadioGroup";

interface Props {
    font: string;
    variant: string;
    setVariant: (variant: string) => void;
}

const nameMap = {
    '100': 'Thin',
    '100italic': 'Thin italic',
    '200': 'Extra-light',
    '200italic': 'Extra-light italic',
    '300': 'Light',
    '300italic': 'Light italic',
    '400': 'Regular',
    'regular': 'Regular',
    '400italic': 'Regular italic',
    'italic': 'Regular italic',
    '500': 'Medium',
    '500italic': 'Medium italic',
    '600': 'Semi-bold',
    '600italic': 'Semi-bold italic',
    '700': 'Bold',
    '700italic': 'Bold italic',
    '800': 'Extra-bold',
    '800italic': 'Extra-bold italic',
    '900': 'Black',
    '900italic': 'Black italic',
};

export default function GoogleVariantSelect({font, variant, setVariant}: Props): ReactElement | null {
    const fonts = useGoogleFont();
    const variants = useMemo(() => {
        const usedFont = fonts.find(({family}) => family === font);
        return usedFont?.subSets.sort().map((name) => ({name: nameMap[name], value: name})) || [];
    }, [fonts, font]);

    if(variants.length > 2) {
        return <RadioGroup checked={variant} label={'Font variant'} options={variants} setChecked={setVariant} regularLabel/>
    }

    return null;
}