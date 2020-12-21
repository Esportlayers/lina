
import classNames from "classnames";
import { ReactElement, useEffect, useState } from "react";
import Button from "../../../Ui/button/Button";
import Container from "../../../Ui/container/Container";
import { FullPageSliderProps } from "../../../Ui/fullpageslide/FullPageSlide";
import NudgeFromBottom from "../../../Ui/motion/NudgeFromBottom";
import { useMessageListener } from "../../../Websocket/MessageHandler";
import { isGsiConnectedMessage } from "../../../Websocket/State";

export default function WaitingForConnection({onContinue}: FullPageSliderProps): ReactElement {
    const message = useMessageListener();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if(isGsiConnectedMessage(message)) {
            setConnected(message.value);
        }
    }, [message]);

    return <Container>
        <NudgeFromBottom delay={.2}>
            <h2>Start or restart your Dota 2 and join, replay or observe a game</h2>
        </NudgeFromBottom>

        <br />


        <NudgeFromBottom delay={.2}>
            <h5>
                {!connected && <>Waiting for connection...</>}
                {connected && <>You are connected 🥳</>}
            </h5>
        </NudgeFromBottom>

        <NudgeFromBottom delay={0.5}>
            <div className={classNames('loader', {connected})}>
                <div className={'checkmark draw'}></div>
            </div>
        </NudgeFromBottom>

        <br />
        <br />

        {connected && <NudgeFromBottom>
            <Button onClick={onContinue}>
                Get your overlays
            </Button>
        </NudgeFromBottom>}

        <style jsx>{`
            h5 {
                font-weight: 400;
                font-size: 1.8rem;
            }

            .loader {
                display: inline-flex;
                margin: 2rem auto;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-left-color: var(--primary-accent);
                animation: spin 2s infinite linear;
                position: relative;
                vertical-align: top;
                border-radius: 50%;
                width: 6rem;
                height: 6rem;
            }


            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            .connected {
                -webkit-animation: none;
                animation: none;
                border-color: var(--primary-accent);
                transition: border 500ms ease-out;
            }

            .checkmark {
                display: none;
            }

            .connected .checkmark {
                display: block;
            }

            .checkmark.draw:after {
                animation-duration: 800ms;
                animation-timing-function: ease;
                animation-name: checkmark;
                transform: scaleX(-1) rotate(135deg);
            }

            .checkmark:after {
                opacity: 1;
                height: 3rem;
                width: 1.5rem;
                transform-origin: left top;
                border-right: 3px solid var(--primary-accent);
                border-top: 3px solid var(--primary-accent);
                content: '';
                left: 1.25rem;
                top: 3rem;
                position: absolute;
            }

            @keyframes checkmark {
                0% {
                    height: 0;
                    width: 0;
                    opacity: 1;
                }
                20% {
                    height: 0;
                    width: 1.5rem;
                    opacity: 1;
                }
                40% {
                    height: 3rem;
                    width: 1.5rem;
                    opacity: 1;
                }
                100% {
                    height: 3rem;
                    width: 1.5rem;
                    opacity: 1;
                }
            }
        `}</style>
    </Container>;
}