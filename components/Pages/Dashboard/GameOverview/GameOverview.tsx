import { ReactElement, useState } from "react";
import Tabs from "../../../Ui/tabs/Tabs";

const tabs = [{
    name: 'Draft',
    value: 'draft',
}, {
    name: 'In-Game',
    value: 'ingame',
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