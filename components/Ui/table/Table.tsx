import { access } from "fs";
import { ReactElement } from "react";
import NoDataCellRenderer from "./NoDataCellRenderer";

export interface TableProps<T extends object> {
    rowDefinitions: Array<{
        label?: string;
        accessKey: string;
        renderer?: React.FC<T>;
        showLabel?: boolean;
        width?: string;
    }>; 
    rows: Array<T>;
}

export default function Table<T extends object>({rowDefinitions, rows}: TableProps<T>): ReactElement {
    return <table>
        <thead>
            <tr>
                {rowDefinitions.map(({accessKey, label, showLabel = true, width}) => <th key={accessKey} style={{width}}>{showLabel && label}</th>)}
            </tr>
        </thead>
        <tbody>
            {rows.map((row, idx) => <tr key={idx}>
                {rowDefinitions.map(({accessKey, renderer}) => {
                const Comp = renderer;
                return <td key={accessKey}>
                    {Comp  && <Comp {...row} />}
                    {!Comp && row[accessKey]}
                </td>})}
            </tr>)}

            {rows.length === 0 && <tr>
                <td colSpan={rowDefinitions.length}><NoDataCellRenderer /></td>
            </tr>}
        </tbody>

        <style jsx>{`
            table {
                margin: 2rem 0;
                width: 100%;
                table-layout: fixed;
            }

            th {
                font-size: 12px;
                text-transform: uppercase;
                padding: .5rem 8px;
                height: 2rem;
                border-bottom: 1px solid rgba(255, 255, 255, .5);
                text-align: left;
            }

            td {
                min-height: 2rem;
                font-size: 14px;
                padding: .5rem 8px;
                transition: background-color 120ms ease-in-out;
            }

            tr:hover td {
                background-color: rgba(0,0,0,.1);
            }
        `}</style>
    </table>;
}