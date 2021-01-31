import { BetSeasonToplist as VoteSeasonToplist } from "@streamdota/shared-types";
import classNames from "classnames";
import { ReactElement, useMemo } from "react";
import { useVoteSeasons } from "../../../../../../../modules/selector/VoteSeasons";
import { useVoteSeasonToplist } from "../../../../../../../modules/selector/VoteSeasonToplist";
import IndexRankingCellRenderer from "../../../../../../Ui/table/IndexRankingCellRenderer";
import Table, { TableProps } from "../../../../../../Ui/table/Table";
import ToplistPercentageCellRenderer from './ToplistPercentageCellRenderer';

interface Props {
    filter: string;
    seasonId: number;
}

const rowDefinition: (winnerCount: number) => TableProps<VoteSeasonToplist>['rowDefinitions'] = (winnerCount) => [
    {
        label: '#',
        accessKey: 'rank',
        renderer: IndexRankingCellRenderer,
        width: '40px',
    },
    {
        label: 'Name',
        accessKey: 'name',
        renderer: ({rowIndex, name}) => <div className={classNames({isWinner: rowIndex + 1 <= winnerCount})}>
            {name}
            <style jsx>{`
                .isWinner {
                    font-size: 1rem;
                    color: var(--primary-accent);
                    font-weight: bold;
                }    
            `}</style>
        </div>,
    }, {
        label: 'Entrants',
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
    const seasons = useVoteSeasons();
    const winnerCount = useMemo(() => {
        if(seasons && seasonId) {
            const relevantSeason = seasons.find(({id}) => id === seasonId);
            return relevantSeason?.winnerCount || 1;
        }
        return 1;
    }, [seasons, seasonId]);
    const rows = useMemo(() => {
        if(toplist && filter.length > 0) {
            const lower = filter.toLocaleLowerCase();
            return toplist.filter(({username}) => username.includes(lower));
        }
        return toplist || [];
    }, [toplist, filter]);

    return <Table<VoteSeasonToplist> rows={rows} rowDefinitions={rowDefinition(winnerCount)} />;
}