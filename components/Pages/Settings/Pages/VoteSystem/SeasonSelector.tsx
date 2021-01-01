import React, { ReactElement, useMemo } from "react";
import {useVoteSeasons} from '../../../../../modules/selector/VoteSeasons';
import Select from '../../../../Ui/select/Select';

interface Props {
    season: number;
    onChange: (season: number) => void;
}

export default function SeasonSelector({season, onChange}: Props): ReactElement {
    const seasons = useVoteSeasons();
    const options = useMemo(() => seasons ? seasons.map(({id, name}) => ({name, value: '' + id})) : [], [seasons]);
    return <Select options={options} selected={'' + season} onSelect={(val) => onChange(+val)} label={'Season'} />;
}