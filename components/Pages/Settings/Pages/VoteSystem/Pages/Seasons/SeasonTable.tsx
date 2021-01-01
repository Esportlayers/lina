import { BetSeason as VoteSeason } from "@streamdota/shared-types";
import { ReactElement } from "react";
import { useVoteSeasons } from "../../../../../../../modules/selector/VoteSeasons";
import Table from '../../../../../../Ui/table/Table';
import ActionCellRenderer from "./ActionCellRenderer";

const rowDefinitions = [
    {
        label: 'Name',
        accessKey: 'name',
    }, {
        accessKey: 'actions',
        renderer: ActionCellRenderer,
        width: '15rem',
    }
]

export default function SeasonTable(): ReactElement | null {
    const seasons = useVoteSeasons();

    if(seasons) {
        return <Table<VoteSeason> rows={seasons} rowDefinitions={rowDefinitions}/>;
    }

    return null;
}