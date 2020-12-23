import { ReactElement } from "react";

export default function Divider(): ReactElement {
    return <div className={'divider'}>
        <style jsx>{`
            .divider {
                width: 1px;
                height: 100%;
                padding: .1rem 0;
                margin: 0 1rem;
                background-color: rgba(255, 255, 255, .5);
            }    
        `}</style>
    </div>
}