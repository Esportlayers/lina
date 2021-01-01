import { BetSeason } from "@streamdota/shared-types";
import { ReactElement } from "react";
import Delete from "./Actions/Delete";
import Edit from "./Actions/Edit";

export default function ActionCellRenderer({id, name}: BetSeason): ReactElement {
    return <div className={'actionRow'}>
        <Edit id={id} name={name} />
        <div className={'divider'} />
        <Delete id={id} name={name} />

        <style jsx>{`
            .actionRow {
                display: flex;
                align-items: center;
                justify-content: center;
            }   

            .divider {
                margin: 0 1rem;
            } 
        `}</style>
    </div>;
}