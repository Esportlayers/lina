import { ReactElement, useMemo } from "react";
import { useMatchTeams } from "../../../../../../modules/selector/Teams";
import Image from 'next/image';
import { EventTypes, GsiDraftMessage, useTetherMessageListener } from "@esportlayers/io";
import classNames from "classnames";

interface Props {
    matchId: number;
}

function secondsToTime(seconds: number): string {
    let sec = seconds % 60;
    let min = Math.floor(seconds / 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

export default function DraftTeams({matchId}: Props): ReactElement {
    const teams = useMatchTeams(matchId) || {
        radiant: {
            name: 'Radiant',
            logo: null,
        },
        dire: {
            name: 'Dire',
            logo: null,
        }
    };
    const radiantLogoUrl = useMemo(() => teams.radiant.logo ?? '/images/radiant_icon.png', [teams]);
    const direLogoUrl = useMemo(() => teams.dire.logo ?? '/images/dire_icon.png', [teams]);
    
    const {value: draft} = useTetherMessageListener<GsiDraftMessage>(EventTypes.gsi_draft);
    const radiantActive = draft && draft.activeteam === 2;
    const activeTeamRemaining = draft && draft.activeteam_time_remaining;

    if(draft && Object.values(draft).length > 0) {
        return <>
            <div className={'teamHeader'}>
                <div className={'team'}>
                    <div className={'teamLogo'}>
                        <Image width={80} height={80} src={radiantLogoUrl} alt={'radiant logo'}/>
                    </div>

                    <div className={'name'}>{teams.radiant.name}</div>
                </div>

                <div className={'draftTiminig'}>
                    <div className={classNames('duration', {active: radiantActive && activeTeamRemaining !== 0})}>{radiantActive ? secondsToTime(activeTeamRemaining) : '0:30'}</div>
                    <div className={classNames('duration', {active: radiantActive && activeTeamRemaining === 0})}>{draft ? secondsToTime(draft.radiant_bonus_time) : '0:00'}</div>
                </div>
            </div>
            
            <div className={'teamHeader'}>
                <div className={'team'}>
                    <div className={'teamLogo'}>
                        <Image width={80} height={80} src={direLogoUrl} alt={'dire logo'}/>
                    </div>

                    <div className={'name'}>{teams.dire.name}</div>
                </div>

                <div className={'draftTiminig'}>
                    <div className={classNames('duration', {active: !radiantActive && activeTeamRemaining !== 0})}>{!radiantActive ? secondsToTime(activeTeamRemaining) : '0:30'}</div>
                    <div className={classNames('duration', {active: !radiantActive && activeTeamRemaining === 0})}>{draft ? secondsToTime(draft.dire_bonus_time) : '0:00'}</div>
                </div>
            </div>

            <style jsx>{`
                .teamHeader {
                    display: flex;
                    align-items: center;
                    text-transform: uppercase;
                    justify-content: space-between;
                }

                .team {
                    display: flex;
                    align-items: center;
                }

                .name {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-left: 2rem;
                }

                .teamLogo {
                    border-radius: .5rem;
                    overflow: hidden;
                    height: 80px;
                }

                .draftTiminig {
                    width: 5rem;
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    line-height: 1.5em;
                }

                .duration {
                    transition: font-size 120ms ease-in-out, color 120ms ease-in-out;
                }

                .active {
                    font-size: 1.5rem;
                    color: var(--primary-accent);
                    font-weight: bold;
                }

                @media screen and (max-width: 1000px) {
                    .teamHeader {
                        order: 1;
                    }

                    .teamHeader + .teamHeader {
                        order: 4;
                        margin-top: 4rem;
                    }
                }
            `}</style>
        </>;
    }

    return null;
}