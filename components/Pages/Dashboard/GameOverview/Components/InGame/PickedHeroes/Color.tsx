import classNames from "classnames";
import { ReactElement } from "react";

interface Props {
    playerIndex: number;
}

export default function Color({playerIndex}: Props): ReactElement {
    return <div className={classNames('playerColor', `index-${playerIndex}`)}>
        <style jsx>{`
            .playerColor {
                height: .4rem;
                box-shadow: inset 0 0 4px rgba(0,0,0,0.8)
            }
            .index-1.playerColor {
                background-color: #3074F9;
            }
            .index-2.playerColor {
                background-color: #66FFC0;
            }
            .index-3.playerColor {
                background-color: #BD00B7;
            }
            .index-4.playerColor {
                background-color: #F8F50A;
            }
            .index-5.playerColor {
                background-color: #FF6901;
            }
            .index-6.playerColor {
                background-color: #FF88C5;
            }
            .index-7.playerColor {
                background-color: #A2B349;
            }
            .index-8.playerColor {
                background-color: #63DAFA;
            }
            .index-9.playerColor {
                background-color: #01831F;
            }
            .index-10.playerColor {
                background-color: #9F6B00;
            }
        `}</style>
    </div>
}