import { ReactElement } from "react";
import CurrentSeason from "./General/CurrentSeason";
import NewSeason from "./Seasons/NewSeason";
import Table from "./Seasons/SeasonTable";

export default function Seasons(): ReactElement {
    return <div>
        <NewSeason />
        <Table />
    </div>;
}