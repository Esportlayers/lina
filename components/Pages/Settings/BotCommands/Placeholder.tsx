import { ReactElement, useMemo } from "react";

interface Props {
    placeholder: string[];
}

export default function Placeholder({placeholder}: Props): ReactElement {
    const allPlaceholder = useMemo(() => ['user', ...placeholder], [placeholder]);

    return <div className={'placeholders'}>
        {allPlaceholder.map((tag) => <div className={'placeholder'} key={tag}>{`{${tag.toUpperCase()}}`}</div>)}

        <style jsx>{`
            .placeholders {
                display: flex;
                align-items: center;
                margin: 10px 0 32px;
                flex-wrap: wrap;
            }

            .placeholder {
                background-color: rgba(0,0,0,.2);
                border: 1px solid rgba(0,0,0,.4);
                border-radius: .25rem;
                margin: .5rem;
                padding: .25rem .75rem;
                font-family: monospace;
                font-size: .7rem;
            }
        `}</style>
    </div>;
}