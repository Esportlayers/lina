import { ReactElement } from "react";
import { BetSeasonToplist as VoteSeasonToplist } from "@streamdota/shared-types";

export default function ToplistPercentageCellRenderer({total, won}: VoteSeasonToplist): ReactElement {
    const percentage = Math.floor((+won * 100) / total);
    return <>{percentage}%</>;
}