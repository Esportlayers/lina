import { ReactElement, useCallback } from "react";
import { loadWordGroups, updateWordGroup } from "../../../../../modules/reducer/WordGroup";
import { useDispatch, useSelector } from "react-redux";
import { useWordGroups, wordEntitiesSelector } from "../../../../../modules/selector/WordGroup";

import Button from "../../../../Ui/button/Button";
import Checkbox from "../../../../Ui/toggle/Checkbox";
import CreateWordGroup from "./CreateWordGroup";
import DeleteWord from "./DeleteWord";
import DeleteWordGroup from "./DeleteWordGroup";
import Description from "../../../../Ui/description/Description";
import Link from 'next/link';
import NewWord from "./NewWord";
import SettingsTitle from "../../SettingsTitle";
import { Word } from "@streamdota/shared-types";
import { updateWord } from "../../../../../modules/reducer/Word";

export default function ChatAnalyses(): ReactElement {
    const wordEntities = useSelector(wordEntitiesSelector);
    const wordGroups = useWordGroups() || [];
    const dispatch = useDispatch();

    const update = useCallback(async (id: number, data: Partial<Word>) => {
        dispatch(updateWord(id, data));
        await dispatch(loadWordGroups());
    }, [dispatch])

    return <div className={'page'}>
        <SettingsTitle>Chat Analysis</SettingsTitle>
        <Description>This section allows you to analyse messages in your stream on specific keywords. Analysis scope includes count, word-pairings, impressions & sentiment analysis.<br />This section is restricted, if you need more groups or keywords, please contact us.</Description>

        <br />
        <br />

        {wordGroups.map(({ active, id, name, words }) => <div key={id}>
            <SettingsTitle>
                <Checkbox label={name} checked={active} onChange={(active) => dispatch(updateWordGroup(id, { active }))} />
            </SettingsTitle>
            <br />
            <div className={'wordGrid'}>
                {words.map((id) => wordEntities[id]).filter(Boolean).map(({ id, word, useSentimentAnalysis }) => <div className={'wordTile'} key={id}>
                    <div className={'word'}>{word}</div>
                    <Checkbox label={'Use sentiment analysis'} checked={useSentimentAnalysis} onChange={(useSentimentAnalysis) => update(id, { useSentimentAnalysis })} />
                    <DeleteWord id={id} word={word} name={name} />
                </div>)}
                {words.length < 5 && <div className={'wordTile'}>
                    <NewWord wordGroup={id} />
                </div>}
            </div>


            <br />
            <br />
            <div className={'buttonRow'}>
                <Link as={`/settings/chatAnalyses/${id}`} href={'/settings/chatAnalyses/[wordGroupId]'}>
                    <a>
                        <Button>Analyses</Button>
                    </a>
                </Link>
                &nbsp;
                &nbsp;
                &nbsp;
                <DeleteWordGroup id={id} name={name} />
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>)}

        {wordGroups.length < 1 && <CreateWordGroup />}

        <style jsx>{`
            .page {
                padding: 2rem 2.75rem;
            }    

            .wordGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, 300px);
                grid-gap: 4rem;
            }

            .wordTile {
                background-color: var(--anthrazit);
                padding: 1rem 1.5rem;
                box-shadow: 0 2px 15px rgba(0,0,0,0.5);
                text-align: center;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
            }

            .word {
                color: var(--primary-accent);
                margin-bottom: 2rem;
                font-weight: bold;
                font-size: 1.5rem;
            }

            .buttonRow {
                display: flex;
                align-items: center;
            }
        `}</style>
    </div>
}