import { DotaStats } from "@streamdota/shared-types";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useDotaStats } from "../../../../../../../modules/selector/DotaStats";
import { useVoteOverlay } from "../../../../../../../modules/selector/VoteOverlay";
import Table, { TableProps } from "../../../../../../Ui/table/Table";
import DateCellRenderer from "../../../../../../Ui/table/DateCellRenderer";
import SettingsTitle from "../../../../SettingsTitle";
import { EventTypes, GsiGameWinnerMessage, useTetherMessageListener } from "@esportlayers/io";
import { useDispatch } from "react-redux";
import { loadDotaStats, removeAllGames } from "../../../../../../../modules/reducer/DotaStats";
import ActionCellRenderer from "./ActionCellRenderer";
import NudgeFromBottom from "../../../../../../Ui/motion/NudgeFromBottom";
import ModalHeader from "../../../../../../Ui/modal/ModalHeader";
import Button from "../../../../../../Ui/button/Button";
import Modal from "../../../../../../Ui/modal/Modal";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";


const rowDefinition: TableProps<DotaStats>['rowDefinitions'] = [
    {
        label: 'Date',
        accessKey: 'date',
        renderer: ({date}) => <DateCellRenderer ts={date} />,
    }, {
        label: 'Won',
        accessKey: 'won',
        renderer: ({won}) => {
            if(Boolean(won)) {
                return <>Won</>;
            }
            return <>Lost</>;
        },
    }, {
        label: '#',
        accessKey: 'actions',
        renderer: ActionCellRenderer,
    }
];

export default function DotaStatsTable(): ReactElement {
    const stats = useDotaStats();
    const won = useMemo(() => stats ? Object.values(stats).filter(({won}) => won).length : 0, [stats]);
    const games = stats ? Object.values(stats).length : 0;
    const voteOverlay = useVoteOverlay();
    const msg = useTetherMessageListener<GsiGameWinnerMessage>(EventTypes.gsi_game_winner);
    const dispatch = useDispatch();
    const user = useCurrentUser();
    const [showDeleteAll, setShowDeleteAll] = useState(false);

    useEffect(() => {
        if(msg) {
            dispatch(loadDotaStats());
        }
    }, [dispatch, msg]);
    
    return <div>
        <SettingsTitle>Dota Stats</SettingsTitle>
        <div className={'totalStats'}>Total Stats: <span style={{color: voteOverlay?.distributionColorLeft}}>{won}</span>&nbsp;/&nbsp;<span style={{color: voteOverlay?.distributionColorRight}}>{games - won}</span></div>

        <Table<DotaStats> rows={stats ? Object.values(stats) : []} rowDefinitions={rowDefinition} />

        {user.dotaStatsFrom === 'manual' && <>
            <div className={'btn'}>
                <Button del onClick={() => setShowDeleteAll(true)}>Delete all games</Button>
            </div>

            <Modal open={showDeleteAll}>
                <NudgeFromBottom delay={.1}>
                    <ModalHeader>Delete game all games</ModalHeader>
                </NudgeFromBottom>
                <NudgeFromBottom delay={.12}>
                    <h4>Are you sure that you want to delete all games?</h4>
                </NudgeFromBottom>
                <NudgeFromBottom delay={.14}>
                    <div className={'info'}>Your data will be immediately removed, there is <b>no</b> recovery.</div>
                </NudgeFromBottom>

                <div className={'buttonRow'}>
                    <NudgeFromBottom delay={.23}>
                        <Button del onClick={() => {
                            dispatch(removeAllGames());
                            setShowDeleteAll(false);
                        }}>Delete all games</Button>
                    </NudgeFromBottom>

                    <NudgeFromBottom delay={.3}>
                        <Button ghost onClick={() => setShowDeleteAll(false)}>Cancel</Button>
                    </NudgeFromBottom>
                </div>
            </Modal>

            <style jsx>{`
                h4 {
                    margin: 0 0 2rem 0;
                }
                .info {
                    font-size: .9rem;
                    margin: .5rem 0;
                }

                .buttonRow {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 3rem;
                }

                .btn {
                    display: flex;
                }
            `}</style>
        </>}
    </div>
}