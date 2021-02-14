import { ReactElement, useCallback, useState } from "react";
import Tabs, { Tab } from "../../../../Ui/tabs/Tabs";
import General from "./Pages/General";
import Overlays from "./Pages/Overlays";
import Rounds from "./Pages/Rounds";
import Seasons from "./Pages/Seasons";
import Toplist from "./Pages/Toplist";
import Analytics from "./Pages/Analytics";
import Chat from "./Pages/Chat";
import { useVoteSeasons } from "../../../../../modules/selector/VoteSeasons";
import { createVoteSeason } from "../../../../../modules/reducer/VoteSeason";
import { useDispatch } from "react-redux";
import NudgeFromBottom from "../../../../Ui/motion/NudgeFromBottom";
import ModalHeader from "../../../../Ui/modal/ModalHeader";
import Input from "../../../../Ui/input/Input";
import Button from "../../../../Ui/button/Button";

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
    const seasons = useVoteSeasons();
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const onCreate = useCallback(() => {
        dispatch(createVoteSeason({name}, true));
        setName('');
    }, [dispatch, name]);

    if(!seasons) {
        return <div className={'unconfigured'}>
            <div className={'voteForm'}>
                <NudgeFromBottom delay={.1}>
                    <ModalHeader>Create your first vote season</ModalHeader>
                </NudgeFromBottom>

                <NudgeFromBottom delay={.2}>
                    <div className={'name'}>
                        <Input autoFocus label={'Name'} value={name} onChange={setName} />
                    </div>
                </NudgeFromBottom>

                <div className={'buttonRow'}>
                    <NudgeFromBottom delay={.3}>
                        <Button onClick={onCreate}>Create season</Button>
                    </NudgeFromBottom>
                </div>
            </div>

            <style jsx>{`
                .unconfigured {
                    max-width: 800px;
                    margin: 10vh auto;
                }    

                .voteForm {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }

                .buttonRow {
                    margin-top: 5rem;
                }

                .name {
                    min-width: 500px;
                    margin-top: 2rem;
                }
            `}</style>
        </div>
    }

    return <div className={'voting'}>
        <Tabs active={active} setActive={setActive} tabs={tabs} relaxedContent maxHeight/>
    </div>;
}