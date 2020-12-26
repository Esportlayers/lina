import React, { ReactElement } from "react";
import ActiveVoting from "./Header/ActiveVoting";
import Activity from "./Header/Activity";
import GSIConnected from "./Header/GSIConnected";
import IconLoader from '../../Ui/loader/IconLoader';
import MatchId from "./Header/MatchId";
import MatchState from "./Header/MatchState";

export default function DashboardHeader(): ReactElement {

    return <header>
        <div className={'headerRow'}>
            <GSIConnected />
            <ActiveVoting />
            <Activity />
            <MatchId />
            <MatchState />
        </div>

        <style jsx>{`
            header {
                background-color: var(--anthrazit);
                width: 100%;
                position: fixed;
                top: 0;
                padding: .75rem 0;
                box-shadow: 0 0 15px rgba(0,0,0,.3);
                font-size: .95rem;
                height: 3rem;
            }    

            .headerRow {
                display: flex;
                align-items: center;
                padding: 0 1rem;
                height: 100%;
            }
        `}</style>
    </header>
}