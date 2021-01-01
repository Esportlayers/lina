import { BettingMessage, EventTypes, GsiGameWinnerMessage, useTetherMessageListener } from "@esportlayers/io";
import { BetRoundStats as VoteRound } from "@streamdota/shared-types";
import { access } from "fs";
import { ReactElement, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { loadVoteRounds } from "../../../../../../../modules/reducer/VoteRound";
import { useVoteRounds } from "../../../../../../../modules/selector/VoteRound";
import DateCellRenderer from "../../../../../../Ui/table/DateCellRenderer";
import Table, { TableProps } from "../../../../../../Ui/table/Table";
import ActionCellRenderer from "./ActionCellRenderer";
import CreatedDateCellRenderer from "./CreatedDateCellRenderer";
import DistributionCellRenderer from "./DistributionCellRenderer";
import ParticipantCellRenderer from "./ParticipantCellRenderer";

interface Props {
    seasonId: number;
}

function getRowDefinition(_hasMultiChannels: boolean): TableProps<VoteRound>['rowDefinitions'] {
    return [
        {
            label: '#',
            accessKey: 'round',
            width: '2rem',
        }, {
            label: 'Date',
            accessKey: 'created',
            renderer: CreatedDateCellRenderer,
        }, {
            label: 'Participants',
            accessKey: 'total',
            renderer: ParticipantCellRenderer,
        }, {
            label: 'Distribution',
            accessKey: 'distribution',
            renderer: DistributionCellRenderer,
        }, {
            label: 'Winner',
            accessKey: 'result',
            width: '5rem',
        }, {
            showLabel: false,
            accessKey: 'actions',
            renderer: ActionCellRenderer,
            width: '8rem',
        }
    ]
}

export default function RoundsTable({seasonId}: Props): ReactElement {
    const rounds = useVoteRounds(seasonId);
    const channels = useMemo(() => rounds.reduce((acc, {userId}) => {
        acc.add(userId);
        return acc;
    }, new Set()), [rounds]);
    const definitions = useMemo(() => getRowDefinition(channels.size > 1), [channels]);
    const {value} = useTetherMessageListener<BettingMessage>(EventTypes.betting_v2) || {value: null}; 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadVoteRounds(seasonId));
    }, [value, dispatch]);

    const rows = useMemo(() => rounds.sort(({round: a}, {round: b}) => b - a), [rounds]);

    return <Table<VoteRound> rows={rows} rowDefinitions={definitions} />;
}