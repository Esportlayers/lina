import { EventTypes, GsiConnectedMessage, useTetherMessageListener } from "@esportlayers/io";
import { ReactElement } from "react";
import Indicator from "../../../Ui/indicator/Indicator";

export default function GSIConnected(): ReactElement {
    const {value: connected} = useTetherMessageListener<GsiConnectedMessage>(EventTypes.gsi_connected) || {value: false};

    return <>
        <Indicator active={connected} />
        <div className={'gsiConnectedLabel'}>
            {connected && 'GSI connected'}
            {!connected && 'GSI disconnected'}
        </div>
    </>;
}