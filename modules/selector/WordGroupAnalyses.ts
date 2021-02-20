import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordGroup } from "../reducer/WordGroup";
import { loadWordGroupAnalyses, WordGroupAnalysesState, WordStats } from "../reducer/WordGroupAnalyses";
import { State } from "../Store";
import { loadedWordGroupAnalysesSelector } from "./UiSelector";

export const wordGroupAnalysesEntitiesSelector = (state: State): WordGroupAnalysesState => state.entities.wordGroupAnalyses;

export function useWordGroupAnalyses(wordGroupId: number): WordStats[] | undefined {
	const wordGroupAnalyses = useSelector(wordGroupAnalysesEntitiesSelector);
	const loaded = (useSelector(loadedWordGroupAnalysesSelector) || []).includes(wordGroupId);
	const dispatch = useDispatch();

	useEffect(
		() => {
            if(!loaded ) {
                dispatch(loadWordGroupAnalyses(wordGroupId));
            }
		},
		[loaded, wordGroupId]
	);

	return Object.values(wordGroupAnalyses || {}).filter(({wordGroup}) => wordGroupId === wordGroup);
}
