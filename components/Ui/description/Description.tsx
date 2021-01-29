import { Children, ReactElement, ReactNode } from "react"


interface Props {
    children: ReactNode;
}

export default function Description({children}: Props): ReactElement {
    return <div className={'description'}>
        {children}

        <style jsx>{`
            .description {
                font-size: .8rem;
            }
        `}</style>
    </div>
}