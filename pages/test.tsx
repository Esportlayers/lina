import { ReactElement } from "react";


export default function Test(): ReactElement {
    return <div>

        <video width={'100%'} loop autoPlay muted>
            <source src={'/draftmodels_none.mov'} type="video/mp4" />
        </video>
    </div>
}