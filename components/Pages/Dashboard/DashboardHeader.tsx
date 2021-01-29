import React, { ReactElement } from "react";
import ActiveVoting from "./Header/ActiveVoting";
import Activity from "./Header/Activity";
import GSIConnected from "./Header/GSIConnected";
import UseKeywordListener from "./Header/UseKeywordListener";
import Link from 'next/link';

export default function DashboardHeader(): ReactElement {

    return <header>
        <div className={'headerRow'}>
            <GSIConnected />
            <ActiveVoting />
            <UseKeywordListener />
            <Activity />
        </div>

        <div className={'settings'}>
            <Link href={'/settings/voteSystem'}>
                <svg width={'30px'} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M487.4 315.7L444.8 291.1C449.1 267.9 449.1 244.1 444.8 220.9L487.4 196.3C492.3 193.5 494.5 187.7 492.9 182.3C481.8 146.7 462.9 114.5 438.2 87.7001C434.4 83.6001 428.2 82.6001 423.4 85.4001L380.8 110C362.9 94.6001 342.3 82.7001 320 74.9001V25.8001C320 20.2001 316.1 15.3001 310.6 14.1001C273.9 5.90006 236.3 6.30006 201.4 14.1001C195.9 15.3001 192 20.2001 192 25.8001V75.0001C169.8 82.9001 149.2 94.8001 131.2 110.1L88.7 85.5001C83.8 82.7001 77.7 83.6001 73.9 87.8001C49.2 114.5 30.3 146.7 19.2 182.4C17.5 187.8 19.8 193.6 24.7 196.4L67.3 221C63 244.2 63 268 67.3 291.2L24.7 315.8C19.8 318.6 17.6 324.4 19.2 329.8C30.3 365.4 49.2 397.6 73.9 424.4C77.7 428.5 83.9 429.5 88.7 426.7L131.3 402.1C149.2 417.5 169.8 429.4 192.1 437.2V486.4C192.1 492 196 496.9 201.5 498.1C238.2 506.3 275.8 505.9 310.7 498.1C316.2 496.9 320.1 492 320.1 486.4V437.2C342.3 429.3 362.9 417.4 380.9 402.1L423.5 426.7C428.4 429.5 434.5 428.6 438.3 424.4C463 397.7 481.9 365.5 493 329.8C494.5 324.3 492.3 318.5 487.4 315.7V315.7ZM256 336C211.9 336 176 300.1 176 256C176 211.9 211.9 176 256 176C300.1 176 336 211.9 336 256C336 300.1 300.1 336 256 336Z"/>
                </svg>
            </Link>
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
                display: flex;
                align-items: center;
                justify-content: space-between;
            }    

            .headerRow {
                display: flex;
                align-items: center;
                padding: 0 1rem;
                height: 100%;
            }
            
            .settings {
                cursor: pointer;
                padding-right: .5rem;
            }

            svg {
                fill: #FFF;
                transition: fill 120ms ease-in-out;
            }

            .settings:hover svg {
                fill: var(--primary-accent);
            }
        `}</style>
    </header>
}