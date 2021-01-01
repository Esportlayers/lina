import { ReactElement, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import { useVoteSeasons } from "../../../../../../../modules/selector/VoteSeasons";
import { updateCurrentUser } from "../../../../../../../modules/reducer/Ui";
import Select from "../../../../../../Ui/select/Select";

export default function CurrentSeason(): ReactElement | null {
    const currentUser = useCurrentUser();
    const seasons = useVoteSeasons();
    const dispatch = useDispatch();
    const onChange = useCallback((betSeasonId: number) => dispatch(updateCurrentUser({betSeasonId})), [dispatch]);
    const options = useMemo(() => seasons ? seasons.map(({id, name}) => ({name, value: '' + id})) : [], [seasons]);
    if(currentUser && seasons && seasons.length > 0) {
        return <Select selected={'' + currentUser.betSeasonId}  onSelect={(val) => onChange(+val)} options={options} label={'Current Season'}/>;
    }

    return null;
}