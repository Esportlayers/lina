import { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import Input from "../../../../../../Ui/input/Input";

export default function StreamDelay(): ReactElement {
    const user = useCurrentUser();
    const dispatch = useDispatch();
    const [duration, setDuration] = useState(user?.streamDelay || 0);
    const onChange = useCallback((newTime) => {
        setDuration(newTime);
        dispatch(updateCurrentUser({streamDelay: +newTime}));
    }, [dispatch]);

    useEffect(() => setDuration(user?.streamDelay || 0), [user]);

    return <div className={'delay'}>
        <Input label={'Chat delay (seconds)'} value={'' + duration} onChange={onChange} type={'number'} />

        <style jsx>{`
            .delay {
                width: 10rem;
                margin-bottom: 3rem;
            }    
        `}</style>
    </div>;
}