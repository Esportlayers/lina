import { State } from '../Store';
import { WordGroup } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedWordGroupsSelector } from './UiSelector';
import isEmpty from 'lodash/isEmpty';
import { loadWordGroups, WordGroupState } from '../reducer/WordGroup';
import { WordState } from '../reducer/Word';

export const wordEntitiesSelector = (state: State): WordState => state.entities.word;
export const wordGroupEntitiesSelector = (state: State): WordGroupState => state.entities.wordGroup;

export const wordGroupsSelector = (state: State): WordGroup[] | undefined =>
	!isEmpty(state.entities.wordGroup) ? Object.values(state.entities.wordGroup) : undefined;

interface WordGroupWithWords extends WordGroup {
	words: number[];
}

export function useWordGroups(): WordGroupWithWords[] | undefined {
	const wordGroups = useSelector(wordGroupsSelector);
	const loaded = useSelector(loadedWordGroupsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadWordGroups());
			}
		},
		[ loaded ]
	);

	return wordGroups as unknown as WordGroupWithWords[];
}
