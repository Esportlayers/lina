import { ReactElement } from "react";


export default function GameTime(): ReactElement {
    return <div className={'gameTime'}>
        <div className={'content'}>

            Streamdota
        </div>

        <style jsx>{`
            .gameTime {
                width: 100%;
                height: 130%;
                box-shadow: 0 0 10px rgba(0,0,0,.5);
                position: relative;
                background-color: var(--anthrazit);
                z-index: 2;
            }   

            .content {
                height: 100%;
                width: 100%;
                background-color: var(--anthrazit);
                position: relative;
                z-index: 3;
            }

            .gameTime::before {
                position: absolute;
                left: -.75rem;
                top: 0;
                bottom: 0;
                content: ' ';
                width: 0px;
                height: 0px;
                -webkit-transform:rotate(360deg);
                border-style: solid;
                border-width: 0 .75rem 5.2rem 0;
                border-color: transparent var(--anthrazit) transparent transparent;
                z-index: 2;
                filter: drop-shadow(0 0 15px rgba(0,0,0,.5));
            }

            .gameTime::after {
                position: absolute;
                right: -.75rem;
                top: 0;
                bottom: 0;
                content: ' ';
                width: 0px;
                height: 0px;
                -webkit-transform: rotate(360deg);
                border-style: solid;
                border-width: 5.2rem .75rem 0 0;
                border-color: var(--anthrazit) transparent transparent transparent;
                z-index: 2;
                filter: drop-shadow(0 0 15px rgba(0,0,0,.5));
            }

            .content {
                transform: perspective(100px) rotateX(0deg);
            } 
        `}</style>
    </div>
}