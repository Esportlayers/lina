import { ReactElement, useMemo } from "react";
import { Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { VoteSeasonRoundStats } from "../../../../../../../modules/reducer/VoteSeasonStats";
import RoundsDataTooltip from "./RoundsDataTooltip";

interface Props {
    roundsData: VoteSeasonRoundStats[];
    compareRoundsData: VoteSeasonRoundStats[];
}
const mapRounds = ({round}) => round;
const strokeColor = 'rgba(255, 255, 255, .5)';

export default function RoundsDataChart({roundsData, compareRoundsData}: Props): ReactElement {
    const fullDataSet = useMemo(() => {
        const maxRounds = Math.max(...roundsData.map(mapRounds), ...compareRoundsData.map(mapRounds), 0);

        return [...Array(maxRounds).keys()].map((idx) => {
            const round = roundsData.find(({round}) => round === idx + 1);
            const compareRound = compareRoundsData.find(({round}) => round === idx + 1);
            return {
                round: idx + 1,
                chatters: round?.chatters || null,
                participants: round?.participants || null,
                compareChatters: compareRound?.chatters || null,
                compareParticipants: compareRound?.participants || null,
            }
        })
    }, [roundsData, compareRoundsData]);

    console.log(fullDataSet);
    const stroke = useMemo(() => ({stroke: strokeColor}), []);
    const fill = useMemo(() => ({fill: strokeColor, fontSize: '.8rem'}), []);

    return <ResponsiveContainer aspect={16 / 9}>
        <LineChart data={fullDataSet} margin={{bottom: 10, left: 5, right: 5}}>
            <defs>
                <filter id="primaryShadow" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor={'var(--primary-accent)'} />
                </filter>
                <filter id="secondaryShadow" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor={'var(--secondary-accent)'} />
                </filter>
            </defs>

            <XAxis dataKey={'round'} axisLine={stroke} tickLine={stroke} tick={fill}>
                <Label value="Rounds" offset={-10} position="insideBottom" fontSize={'.9rem'} style={{fill: strokeColor}}/>
            </XAxis>
            <YAxis axisLine={stroke} tickLine={stroke} tick={fill} />
            <Tooltip animationDuration={.12} content={({active, payload, label}) => <RoundsDataTooltip active={active} payload={payload} label={label} />}/>
            <Line type="linear" strokeWidth={2} filter={'url(#primaryShadow)'} dataKey={'chatters'} stroke={'var(--primary-accent)'} connectNulls={false} dot={false} animationDuration={.12} />
            <Line type="linear" strokeWidth={2} dataKey={'participants'} stroke={'var(--primary-accent-darken)'} connectNulls={false} dot={false} animationDuration={.12} />
            <Line type="linear" strokeWidth={2} filter={'url(#secondaryShadow)'} dataKey={'compareChatters'} stroke={'var(--secondary-accent)'} connectNulls={false} dot={false} animationDuration={.12} />
            <Line type="linear" strokeWidth={2} dataKey={'compareParticipants'} stroke={'var(--secondary-accent-darken)'} connectNulls={false} dot={false} animationDuration={.12} />
        </LineChart>
    </ResponsiveContainer>
}