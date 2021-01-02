import { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { patchVoteOverlay } from "../../../../../../../modules/reducer/VoteOverlay";
import { useVoteOverlay } from "../../../../../../../modules/selector/VoteOverlay";
import Input from "../../../../../../Ui/input/Input";

export default function VoteDuration(): ReactElement {
    const overlay = useVoteOverlay();
    const dispatch = useDispatch();
    const [duration, setDuration] = useState(overlay?.timerDuration || 0);
    const onChange = useCallback((newTime) => {
        setDuration(newTime);
        dispatch(patchVoteOverlay({timerDuration: +newTime}));
    }, [dispatch]);

    useEffect(() => setDuration(overlay?.timerDuration || 0), [overlay]);

    return <div className={'voteDuration'}>
        <Input label={'Vote duration (seconds)'} value={'' + duration} onChange={onChange} />

        <style jsx>{`
            .voteDuration {
                width: 10rem;
            }    
        `}</style>
    </div>;
}