import { isGsiConnectedMessage, useTetherListener } from "@esportlayers/io";
import { ReactElement, useEffect, useState } from "react";
import Indicator from "../../Ui/indicator/Indicator";

export default function DashboardHeader(): ReactElement {
    const msg = useTetherListener();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if(msg && isGsiConnectedMessage(msg)) {
            setConnected(msg.value);
        }
    }, [msg]);

    return <header>
        <div className={'headeRow'}>
            <Indicator active={connected} />
            <div className={'gsiConnectedLabel'}>
                {connected && 'GSI connected'}
                {!connected && 'GSI disconnected'}
            </div>
        </div>


        <style jsx>{`
            header {
                background-color: var(--anthrazit);
                width: 100%;
                position: fixed;
                top: 0;
                padding: .75rem 0;
                box-shadow: 0 0 15px rgba(0,0,0,.3);
                font-size: .95rem;
            }    

            .headeRow {
                display: flex;
                align-items: center;
                padding: 0 1rem;
            }

            .gsiConnectedLabel {
                width: 130px;
            }
        `}</style>
    </header>
}