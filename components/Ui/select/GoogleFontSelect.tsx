import { ReactElement, useMemo } from "react";
import { useGoogleFont } from "../../../modules/selector/GoogleFont";
import Select from "./Select";

interface Props {
    font: string;
    setFont: (font: string) => void;
}

export default function GoogleFontSelect({font, setFont}: Props): ReactElement {
    const fonts = useGoogleFont() || [];
    const options = useMemo(() => fonts.map(({family}) => ({value: family, name: family})), [fonts])

    return <Select label={'Google Font'} options={options} onSelect={setFont} selected={font} />;
}