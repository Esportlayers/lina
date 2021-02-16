import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useWordGroups, wordEntitiesSelector } from "../../../../../modules/selector/WordGroup";
import Button from "../../../../Ui/button/Button";
import Description from "../../../../Ui/description/Description";
import SettingsTitle from "../../SettingsTitle";
import CreateWordGroup from "./CreateWordGroup";
import DeleteWord from "./DeleteWord";
import DeleteWordGroup from "./DeleteWordGroup";
import NewWord from "./NewWord";

export default function ChatAnalysis(): ReactElement {
    const wordEntities = useSelector(wordEntitiesSelector);
    const wordGroups = useWordGroups() || [];

    return <div className={'page'}>
        <SettingsTitle>Chat Analysis</SettingsTitle>
        <Description>This section allows you to analyse messages in your stream on specific keywords. Analysis scope includes count, word-pairings, impressions & sentiment analysis.<br />This section is restricted, if you need more groups or keywords, please contact us.</Description>
        
        <br />
        <br />

        {wordGroups.map(({id, name, words}) => <div key={id}>
            <SettingsTitle>{name}</SettingsTitle>
            <br />
            <div className={'wordGrid'}>
                {words.map((id) => wordEntities[id]).filter(Boolean).map(({id, word}) => <div className={'wordTile'} key={id}>
                    <div className={'word'}>{word}</div>
                    <DeleteWord id={id} word={word} name={name} />
                </div>)}
                <div className={'wordTile'}>
                    <NewWord wordGroup={id} />
                </div>
            </div>


            <br />
            <br />
            <div className={'buttonRow'}>
                <Button>Analyses</Button>
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

        {wordGroups.length < 2 && <CreateWordGroup />}
        
        <style jsx>{`
            .page {
                padding: 2rem 2.75rem;
            }    

            .wordGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, 200px);
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