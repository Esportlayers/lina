import { ReactElement, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createWord } from "../../../../../modules/reducer/Word";
import { loadWordGroups } from "../../../../../modules/reducer/WordGroup";
import Button from "../../../../Ui/button/Button";
import Input from "../../../../Ui/input/Input";

interface Props {
    wordGroup: number;
}
export default function NewWord({wordGroup}: Props): ReactElement {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const onCreate = useCallback(() => {
        if(name.length > 0) {
            dispatch(createWord(wordGroup, name));
            setName('');
            dispatch(loadWordGroups());
        }
    }, [dispatch, name])
    return <>
        <Input autoFocus label={'New Word'} value={name} onChange={setName} onEnter={onCreate}/>
        <br />
        <Button onClick={onCreate}>Create word</Button>
    </>;
}