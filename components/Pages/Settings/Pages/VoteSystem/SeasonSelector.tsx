import React, { ReactElement, useMemo } from "react";
import {useVoteSeasons} from '../../../../../modules/selector/VoteSeasons';
import Select from '../../../../Ui/select/Select';

interface Props {
    season: number;
    onChange: (season: number) => void;
    label?: string;
    nullable?: boolean;
    secondary?: boolean;
}

export default function SeasonSelector({season, label= 'Season', nullable, onChange, secondary}: Props): ReactElement {
    const seasons = useVoteSeasons();
    const mappedSeasons = useMemo(() => seasons ? seasons.map(({id, name}) => ({name, value: '' + id})) : [], [seasons]);
    const options = useMemo(() => nullable ? [{name: '-', value: null}].concat(mappedSeasons) : mappedSeasons, [mappedSeasons, nullable]);
    return <Select secondary={secondary} options={options} selected={'' + season} onSelect={(val) => onChange(isNaN(val as any) ? null : +val)} label={label} />;
}