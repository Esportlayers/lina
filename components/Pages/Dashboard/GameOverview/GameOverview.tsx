import { ReactElement, useState } from "react";
import Tabs from "../../../Ui/tabs/Tabs";
import Draft from "./Draft";
import InGame from "./InGame";

const tabs = [{
    name: 'Draft',
    value: 'draft',
    view: Draft,
}, {
    name: 'In-Game',
    value: 'ingame',
    view: InGame,
}];

export default function GameOverview(): ReactElement {
    const [view, setView] = useState('draft');
    return <div className={'gameOverview'}>
        <Tabs active={view} setActive={setView} tabs={tabs} />

        <style jsx>{`
            .gameOverview {
                width: 100%;
            }    
        `}</style>
    </div>;
}