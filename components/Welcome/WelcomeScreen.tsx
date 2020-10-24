import { ReactElement } from "react";
import { useCurrentUser } from "../../modules/selector/UiSelector";

export default function WelcomeScreen(): ReactElement {
    const currentUser = useCurrentUser();

    return <div className={'welcomeContainer'}>
        <h1 className={'welcome'}>Welcome {currentUser?.displayName || ''}!</h1>
        <h2>
            StreamDota requires a configuration file to work.
            <br />
            <br />
            Please follow the next steps to complete the setup.
        </h2>

        <div className={'btnRow'}>
            <div className={'btn'}>
                Start Setup
            </div>
        </div>

        <style jsx>{`
            .welcomeContainer {
                max-width: 1000px;
                width: 100%;
                margin: 5rem auto;
                text-align: center;
            }

            h1 {
                font-size: 5rem;
            }

            .btn {
                padding: 1.5rem 3.5rem;
                border-radius: 4rem;
                background-color: #FF9900;
                display: inline-flex;
                font-size: 1.2rem;
                line-height: 1.2rem;
                font-weight: bold;
                text-transform: uppercase;
                color: #FFF;
                box-shadow: 4px 4px 15px rgba(0,0,0,0.3);
                cursor: pointer;
                transition: box-shadow 240ms; 
            }

            .btn:hover {
                box-shadow: 4px 4px 20px rgba(0,0,0,0.4);
            }

            .btnRow {
                display: flex;
                align-items: center;
                margin-top: 5rem;
                justify-content: space-around;
            }
        `}</style>
    </div>
}