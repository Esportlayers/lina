import { ReactElement } from "react";
import Particles from 'react-particles-js';

export default function LoginInfo(): ReactElement {
    return <div className={'login'}>

        <div className={'loadingInfo'}>
            We are logging you in...
        </div>

        <Particles
            params={{
                "particles": {
                    "number": {
                        "value": 50
                    },
                    "size": {
                        "value": 2
                    }
                },
                "interactivity": {
                    "events": {
                        "resize": true,
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                    }
                }
            }}
        />

        <style jsx>{`
            .login {
                height: 100vh;
                width: 100vw;
                background-color: var(--anthrazit);
            }

            .loadingInfo {
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                text-transform: uppercase;
                color: #EEE;
                font-weight: bold;
                pointer-events: none;
                animation: pulse 4s infinite;
            }

           @keyframes pulse {
               0% {
                   opacity: .1;
               }
               50% {
                   opacity: 1;
               }
               100% {
                   opacity: .1;
               }
           } 

           :global(#tsparticles) {
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
           }
        `}</style>
    </div>
}