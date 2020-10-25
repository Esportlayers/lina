
import { ReactElement } from "react";
import Button from "../../Util/Button";
import Container from "../../Util/Container";
import NudgeFromBottom from "../../Util/Motion/NudgeFromBottom";
import { WelcomePageProps } from "../WelcomeScreen";

export default function LocateConfig({onContinue}: WelcomePageProps): ReactElement {

    return <Container>
        <NudgeFromBottom delay={.2}>
            <h2>Place the GSI config in the following folder</h2>
        </NudgeFromBottom>

        <br />

        <NudgeFromBottom delay={.3}>
            <div className={'copy'}>
                <pre>
                    steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\
                </pre>
            </div>
        </NudgeFromBottom>

        <NudgeFromBottom delay={.35}>
            <h5>
                You may create the folder <span className={'highlight'}>gamestate_integration</span>.
            </h5>
        </NudgeFromBottom>

        <br />
        <br />

        <NudgeFromBottom delay={.4}>
            <Button onClick={onContinue}>
                I placed the file
            </Button>
        </NudgeFromBottom>

        <style jsx>{`
            pre {
                background-color: rgba(0,0,0,0.2);
                display: inline-flex;
                padding: 1rem 1.5rem;
                font-family: monospace;
            }

            h5 {
                font-weight: 400;
            }

            .highlight {
                font-family: monospace;
                padding: .25rem .5rem;
                margin: 0 .1rem;
                background-color: rgba(0,0,0,0.2);
            }
        `}</style>
    </Container>
}