import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { patchVoteOverlay } from "../../../../../../../modules/reducer/VoteOverlay";
import { useVoteOverlay } from "../../../../../../../modules/selector/VoteOverlay";
import Input from "../../../../../../Ui/input/Input";

export default function VoteDuration(): ReactElement {
    const overlay = useVoteOverlay();
    const dispatch = useDispatch();
    const onChange = useCallback((newTime) => {
        dispatch(patchVoteOverlay({timerDuration: +newTime}));
    }, [dispatch]);

    return <div className={'voteDuration'}>
        <Input label={'Vote duration (seconds)'} value={'' + (overlay?.timerDuration || 0)} onChange={onChange} />

        <style jsx>{`
            .voteDuration {
                width: 10rem;
            }    
        `}</style>
    </div>;
}