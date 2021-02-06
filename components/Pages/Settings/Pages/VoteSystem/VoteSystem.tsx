import { ReactElement, useState } from "react";
import Tabs, { Tab } from "../../../../Ui/tabs/Tabs";
import General from "./Pages/General";
import Overlays from "./Pages/Overlays";
import Rounds from "./Pages/Rounds";
import Seasons from "./Pages/Seasons";
import Toplist from "./Pages/Toplist";
import Analytics from "./Pages/Analytics";
import Chat from "./Pages/Chat";

const tabs: Tab[] = [
    {
        name: 'General',
        value: 'general',
        view: General,
    },
    {
        name: 'Seasons',
        value: 'seasons',
        view: Seasons,
    },
    {
        name: 'Analytics',
        value: 'analytics',
        view: Analytics,
    },
    {
        name: 'Rounds',
        value: 'rounds',
        view: Rounds,
    },
    {
        name: 'Toplist',
        value: 'toplist',
        view: Toplist,
    },
    {
        name: 'Chat interaction',
        value: 'chat',
        view: Chat,
    },
    {
        name: 'Overlays',
        value: 'overlays',
        view: Overlays,
    },
];

export default function VoteSystem(): ReactElement {
    const [active, setActive] = useState('general');
    return <div className={'voting'}>
        <Tabs active={active} setActive={setActive} tabs={tabs} relaxedContent maxHeight/>
    </div>;
}