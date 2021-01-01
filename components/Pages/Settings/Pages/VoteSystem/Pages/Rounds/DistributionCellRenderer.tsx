import { BetRoundStats as VoteRoundStats} from "@streamdota/shared-types";
import { ReactElement } from "react";


export default function DistributionCellRenderer({aBets, bBets}: VoteRoundStats): ReactElement {
    return <>{aBets}/{bBets}</>;
}