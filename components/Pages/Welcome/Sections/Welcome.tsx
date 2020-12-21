import { ReactElement } from "react";
import { useCurrentUser } from "../../../../modules/selector/UiSelector";
import Button from "../../../Ui/button/Button";
import Container from "../../../Ui/container/Container";
import { FullPageSliderProps } from "../../../Ui/fullpageslide/FullPageSlide";
import ExpandFullWidth from "../../../Ui/motion/ExpandFullWidth";
import NudgeFromBottom from "../../../Ui/motion/NudgeFromBottom";
import DeleteButton from "./DeleteButton";

export default function Welcome({onContinue}: FullPageSliderProps): ReactElement {
    const currentUser = useCurrentUser();

    return <Container>
        {currentUser && <NudgeFromBottom>
            <h1 className={'welcome'}>Welcome {currentUser?.displayName || ''}!</h1>
        </NudgeFromBottom>}
        {!currentUser && <div style={{height: 'calc(94px + 1.66em)', fontSize: '2rem'}} />}

        <ExpandFullWidth>
            <hr className={'hr'}/>
        </ExpandFullWidth>

        <NudgeFromBottom delay={.2}>
            <h2>StreamDota requires a GSI configuration file to work.</h2>
            <h4>You can find details on GSI here (there is only an official CSGO documentation): <a href={'https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration'} target={'_blank'}>valvesoftware.com</a></h4>
            <h5>However, if you feel uncomfortable downloading a configuration file, you can also directly delete your account now or later.</h5>
        </NudgeFromBottom>

        <div className={'btnRow'}>
            <DeleteButton />

            <NudgeFromBottom delay={.4}>
                <Button onClick={onContinue}>
                    Start Configure GSI
                </Button>
            </NudgeFromBottom>
        </div>

        <style jsx>{`
            h1, h2, h4, h5 {
                font-weight: 400;
            }

            .btnRow {
                display: flex;
                align-items: center;
                margin-top: 5rem;
                justify-content: space-evenly;
            }

            .hr {
                margin-bottom: 5rem;
            }
        `}</style>
    </Container>

}