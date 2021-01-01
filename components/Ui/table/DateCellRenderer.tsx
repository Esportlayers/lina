import { ReactElement } from "react";
import dayjs from 'dayjs';

interface Props {
    ts: number;
}

export default function DateCellRenderer({ts}: Props): ReactElement {
    const date = dayjs.unix(ts);

    return <>{date.format('DD.MM.YYYY, HH:mm')}</>
}