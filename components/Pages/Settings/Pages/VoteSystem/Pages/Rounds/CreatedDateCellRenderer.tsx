import { BetRoundStats as VoteRoundStats } from "@streamdota/shared-types";
import { ReactElement } from "react";
import DateCellRenderer from "../../../../../../Ui/table/DateCellRenderer";

export default function CreatedDateCellRenderer({created}: VoteRoundStats): ReactElement {
    return <DateCellRenderer ts={created} />;
}