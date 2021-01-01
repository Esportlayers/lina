import { ReactElement } from "react";

interface Props {
    rowIndex: number;
}

export default function IndexRankingCellRenderer({rowIndex}: Props): ReactElement {
    return <>{rowIndex + 1}</>;
}