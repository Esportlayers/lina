import { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../../../../../../modules/reducer/Ui";
import { useCurrentUser } from "../../../../../../../modules/selector/UiSelector";
import { useVoteOverlay } from "../../../../../../../modules/selector/VoteOverlay";
import Input from "../../../../../../Ui/input/Input";


export default function TeamNames(): ReactElement {
    const currentUser = useCurrentUser();
    const dispatch = useDispatch();

    return <div className={'teamNames'}>
        <div className={'teamName'}>
            <Input 
                label={'Team A name'} 
                value={currentUser?.teamAName || ''} 
                onChange={useCallback((teamAName) => dispatch(updateCurrentUser({teamAName})), [dispatch])} />
        </div>

        <div className={'teamName'}>
            <Input 
                label={'Team B name'} 
                value={currentUser?.teamBName || ''} 
                onChange={useCallback((teamBName) => dispatch(updateCurrentUser({teamBName})), [dispatch])} />
        </div>

        <style jsx>{`
            .teamNames {
                display: flex;
                align-items: center;
                margin: 3rem 0;
            }
            .teamName {
                width: 15rem;
                margin-right: 2rem;
            }    
        `}</style>
    </div>;
}