import { useVoteValue, VoteState } from "@esportlayers/io";
import dayjs from "dayjs";
import { ReactElement, useEffect, useRef, useState } from "react";

export function useInterval(callback) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }

        let id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
}


export function secondsToTime(seconds: number): string {
    if(seconds > 0) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
        return `${min}:${sec}`;
    }

    return '0:00';
}


function getTime(state: VoteState | null): string | null {
    if(state) {
        const currentTime = dayjs().unix();
        if(state.status === 'stream_delay') {
            return secondsToTime(state.votingStartingAt - currentTime);
        } else if(state.status === 'betting') {
            return secondsToTime(state.votingPossibleUntil - currentTime);
        } else if(state.status === 'game_running') {
            if(!state.winner) {
                return secondsToTime(currentTime - state.votingPossibleUntil);
            } else {
                return secondsToTime(state.winnerAnnouncement - currentTime);
            }
        }
    }
    return null;
}

export default function Status(): ReactElement {
    const [state] = useVoteValue();
    const [timer, setTimer] = useState(getTime(state));
    useEffect(() => setTimer(getTime(state)), [state]);
    useInterval(() => setTimer(getTime(state)));
    
    return <div className={'status'}>
        <div className={'icon'}>
            {state?.status === 'game_running' && <svg viewBox="0 0 576 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.0101 256C49.6801 256 64.0001 243.44 64.0001 227.94V0L0.970072 221.13C-4.07993 238.84 11.2001 256 32.0101 256ZM575.03 221.13L512 0V227.94C512 243.44 526.32 256 543.99 256C564.8 256 580.08 238.84 575.03 221.13ZM480 210.82C480 90.35 288 0 288 0C288 0 96.0001 90.35 96.0001 210.82C96.0001 293.58 73.1401 356.72 64.8701 391.53C61.4401 405.96 68.4601 420.9 81.1901 426.77L256 512V256L160 224V192H416V224L320 256V512L494.82 426.77C507.55 420.9 514.57 405.96 511.14 391.53C502.86 356.72 480 293.58 480 210.82V210.82Z" fill="#c2c2c2"/>
            </svg>}
            {state?.status === 'betting' && <svg viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M448 400V48C448 21.5 426.5 0 400 0H48C21.5 0 0 21.5 0 48V400C0 426.5 21.5 448 48 448H400C426.5 448 448 426.5 448 400ZM112 160C103.16 160 96 152.84 96 144V112C96 103.16 103.16 96 112 96H240C248.84 96 256 103.16 256 112V144C256 152.84 248.84 160 240 160H112ZM112 256C103.16 256 96 248.84 96 240V208C96 199.16 103.16 192 112 192H336C344.84 192 352 199.16 352 208V240C352 248.84 344.84 256 336 256H112ZM112 352C103.16 352 96 344.84 96 336V304C96 295.16 103.16 288 112 288H176C184.84 288 192 295.16 192 304V336C192 344.84 184.84 352 176 352H112Z" fill="#c2c2c2"/>
            </svg>}
            {state?.status === 'stream_delay' && <svg viewBox="0 0 512 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M256 0C114.6 0 0 93.1 0 208C0 257.6 21.4 303 57 338.7C44.5 389.1 2.7 434 2.2 434.5C0 436.8 -0.6 440.2 0.7 443.2C2 446.2 4.8 448 8 448C74.3 448 124 416.2 148.6 396.6C181.3 408.9 217.6 416 256 416C397.4 416 512 322.9 512 208C512 93.1 397.4 0 256 0ZM128 240C110.3 240 96 225.7 96 208C96 190.3 110.3 176 128 176C145.7 176 160 190.3 160 208C160 225.7 145.7 240 128 240ZM256 240C238.3 240 224 225.7 224 208C224 190.3 238.3 176 256 176C273.7 176 288 190.3 288 208C288 225.7 273.7 240 256 240ZM384 240C366.3 240 352 225.7 352 208C352 190.3 366.3 176 384 176C401.7 176 416 190.3 416 208C416 225.7 401.7 240 384 240Z" fill="#c2c2c2"/>
            </svg>}
        </div>

        <div className={'timer'}>
            {timer}
        </div>

        <style jsx>{`
            .status {
                display: flex;
                align-items: center;
                flex-direction: column;
            }  

            .icon {
                height: 3rem;
                width: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }  

            .icon :global(svg) {
                width: 100%;
            }

            .timer {
                font-family: monospace;
            }
        `}</style>
    </div>;

}