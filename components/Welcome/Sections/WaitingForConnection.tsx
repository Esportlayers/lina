
import { ReactElement } from "react";
import Container from "../../Util/Container";
import Loader from "../../Util/Loader";
import NudgeFromBottom from "../../Util/Motion/NudgeFromBottom";
import { WelcomePageProps } from "../WelcomeScreen";

export default function WaitingForConnection({onContinue}: WelcomePageProps): ReactElement {
    return <Container>
        <NudgeFromBottom delay={.2}>
            <h2>Start or Restart your Dota 2 and join, replay or observer a game</h2>
        </NudgeFromBottom>

        <br />


        <NudgeFromBottom delay={.2}>
            <h5>
                Waiting for connection...
            </h5>
        </NudgeFromBottom>

        <NudgeFromBottom delay={0.5}>
            <div className={'loader'}>
                <Loader />
            </div>
        </NudgeFromBottom>

        <style jsx>{`
            h5 {
                font-weight: 400;
            }

            .loader {
                display: inline-flex;
                margin: 2rem auto;
            }
        `}</style>
    </Container>
}