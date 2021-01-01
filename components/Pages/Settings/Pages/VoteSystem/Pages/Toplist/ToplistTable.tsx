import { BetSeasonToplist as VoteSeasonToplist } from "@streamdota/shared-types";
import { ReactElement, useMemo } from "react";
import { useVoteSeasonToplist } from "../../../../../../../modules/selector/VoteSeasonToplist";
import IndexRankingCellRenderer from "../../../../../../Ui/table/IndexRankingCellRenderer";
import Table, { TableProps } from "../../../../../../Ui/table/Table";
import ToplistPercentageCellRenderer from './ToplistPercentageCellRenderer';

interface Props {
    filter: string;
    seasonId: number;
}

const rowDefinition: TableProps<VoteSeasonToplist>['rowDefinitions'] = [
    {
        label: '#',
        accessKey: 'rank',
        renderer: IndexRankingCellRenderer,
        width: '40px',
    },
    {
        label: 'Name',
        accessKey: 'name',
    }, {
        label: 'Participations',
        accessKey: 'total',
    }, {
        label: 'Correct',
        accessKey: 'won',
    }, {
        label: 'Rate',
        accessKey: 'rate',
        renderer: ToplistPercentageCellRenderer,
        width: '100px',
    }
];

export default function ToplistTable({filter, seasonId}: Props): ReactElement {
    const toplist = useVoteSeasonToplist(seasonId);

    const rows = useMemo(() => {
        if(toplist && filter.length > 0) {
            const lower = filter.toLocaleLowerCase();
            return toplist.filter(({username}) => username.includes(lower));
        }
        return toplist || [];
    }, [toplist, filter]);

    return <Table<VoteSeasonToplist> rows={rows} rowDefinitions={rowDefinition} />;
}