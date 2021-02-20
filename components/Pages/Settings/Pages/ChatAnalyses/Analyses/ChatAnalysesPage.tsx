import { ReactElement, useMemo } from "react";
import { useWordGroups } from "../../../../../../modules/selector/WordGroup";
import { useWordGroupAnalyses } from "../../../../../../modules/selector/WordGroupAnalyses";
import SettingsTitle from "../../../SettingsTitle";
import AnimatedNumber from "animated-number-react";
import Link from 'next/link';

interface Props {
    wordGroupId: number;
}

const formatter = (value) => value.toFixed(0);

function ValueTile({value, name, valueFormatter = formatter}: {value: number; name: string; valueFormatter?: (value: number) => string}): ReactElement {
    return <div className={'valueTile'}>
        <div className={'value'}>
            <AnimatedNumber value={value} formatValue={valueFormatter} duration={120}/>
        </div>
        <div className={'label'}>{name}</div>

        <style jsx>{`
            .valueTile {
                padding: 1rem 1.5rem;
                background-color: var(--anthrazit);
                box-shadow: 0 4px 20px rgba(0,0,0,.5);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: column;
            }    

            .value {
                font-weight: bold;
                font-size: 2rem;
                color: var(--primary-accent);
            }

            .label {
                margin-top: .5rem;
                text-transform: uppercase;
                opacity: .7;
            }
        `}</style>
    </div>
}

export default function ChatAnalysesPage({wordGroupId}: Props): ReactElement {
    const wordGroups = useWordGroups();
    const wordGroup = useMemo(() => {
        return (wordGroups || []).find(({id}) => id === wordGroupId);
    }, [wordGroups, wordGroupId]);

    const analyses = useWordGroupAnalyses(wordGroupId);
    const totalCount = useMemo(() => analyses.reduce((acc, {messages}) => acc + messages.length, 0), [analyses]);
    const totalImpressions = useMemo(() => analyses.reduce((acc, {messages}) => acc + messages.reduce((acc2, {chatters}) => acc2 + chatters, 0), 0), [analyses]);
    const totalScore = useMemo(() => analyses.reduce((acc, {messages, useSentimentAnalysis}) => acc + (useSentimentAnalysis ? messages.reduce((acc2, {sentimentScore}) => acc2 + sentimentScore, 0) : 0), 0), [analyses]);
    const sentimentMessageCount = useMemo(() => analyses.reduce((acc, {messages, useSentimentAnalysis}) => acc + (useSentimentAnalysis ? messages.length : 0), 0), [analyses]);
    const overallScore = sentimentMessageCount > 0 ? totalScore / sentimentMessageCount : 0;
    return <div className={'page'}>
        <Link href={'/settings/chatAnalyses'}><a>Back</a></Link>
        <br />
        <br />
        <br />
        <SettingsTitle>Total Stats: {wordGroup?.name}</SettingsTitle>   
        <div className={'dataGrid'}>
            <ValueTile value={totalCount} name={'Messages'} />
            <ValueTile value={totalImpressions} name={'Impressions'} />
            <ValueTile value={overallScore} name={'Score'} valueFormatter={(value) => value.toFixed(1)} />
        </div>

        {analyses.map(({word, messages, useSentimentAnalysis}) => {
            const score = messages.length > 0 ? messages.reduce((acc, {sentimentScore}) => acc + sentimentScore, 0) / messages.length : 0;
            return <div key={word}>
                <SettingsTitle>Stats: {word}</SettingsTitle>   
                <div className={'dataGrid'}>
                    <ValueTile value={messages.length} name={'Messages'} />
                    <ValueTile value={messages.reduce((acc, {chatters}) => acc + chatters, 0)} name={'Impressions'} />
                    {Boolean(useSentimentAnalysis) && <ValueTile value={score} name={'Score'} valueFormatter={(value) => value.toFixed(1)} />}
                </div>
            </div>
        })}

        <style jsx>{`
            .page {
                padding: 2rem 2.5rem;
            }

            .dataGrid {
                padding: 2rem;
                display: grid;
                grid-template-columns: repeat(auto-fill, 10rem);
                grid-gap: 2rem;
                margin-bottom: 3rem;
            }
        `}</style>
    </div>;
}