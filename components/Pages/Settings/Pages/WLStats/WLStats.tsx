import { ReactElement, useState } from "react";
import Tabs, { Tab } from "../../../../Ui/tabs/Tabs";
import General from "./Pages/General/General";


const tabs: Tab[] = [
    {
        name: 'General',
        value: 'general',
        view: () => <General />,
    },
    {
        name: 'Chat interaction',
        value: 'chat',
        view: () => <>Chat</>,
    },
    {
        name: 'Overlay',
        value: 'overlay',
        view: () => <>Overlay</>,
    },
];
    
export default function WLStats(): ReactElement {
    const [active, setActive] = useState('general');
    return <div>
        <Tabs active={active} setActive={setActive} tabs={tabs} relaxedContent maxHeight/>
    </div>
}