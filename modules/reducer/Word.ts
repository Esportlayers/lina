import { Word } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { CREATE_WORD_FAILURE, CREATE_WORD_REQUEST, CREATE_WORD_SUCCESS, DELETE_WORD_FAILURE, DELETE_WORD_REQUEST, DELETE_WORD_SUCCESS, UPDATE_WORD_FAILURE, UPDATE_WORD_REQUEST, UPDATE_WORD_SUCCESS } from './Actions';
import { loadWordGroups } from './WordGroup';

export interface WordState {
	[x: number]: Word;
}

interface DeleteWord {
	options: {
		urlParams: {
			wordId: number;
		};
	};
	type: typeof DELETE_WORD_SUCCESS;
}

export const word = new schema.Entity(
	'word',
	{},
	{
		processStrategy: (word: Word) => ({
			...word,
			active: Boolean(word.useSentimentAnalysis),
		}),
	}
);

const { addReducer, combinedReducer } = createReducer<WordState>();

addReducer<DeleteWord>(DELETE_WORD_SUCCESS, (state, { options: { urlParams: { wordId } } }) => {
	const newState = { ...state };
	delete newState[wordId];
	return newState;
});

export const wordReducer = combinedReducer;

export function createWord(wordGroupId: number, name: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/word/:wordGroupId`,
				method: 'post',
				types: {
					requestType: CREATE_WORD_REQUEST,
					successType: CREATE_WORD_SUCCESS,
					failureType: CREATE_WORD_FAILURE,
				},
                options: {
					urlParams: {
						wordGroupId,
					},
                    data: {
                        name,
                    }
                }
			},
		});
	};
}

export function updateWord(wordId: number, data: Partial<Word>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/word/:wordId`,
				method: 'patch',
				types: {
					requestType: UPDATE_WORD_REQUEST,
					successType: UPDATE_WORD_SUCCESS,
					failureType: UPDATE_WORD_FAILURE,
				},
				options: {
					urlParams: {
						wordId,
					},
					data,
				},
			},
		});
	};
}

export function deleteWord(wordId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/word/:wordId`,
				method: 'del',
				types: {
					requestType: DELETE_WORD_REQUEST,
					successType: DELETE_WORD_SUCCESS,
					failureType: DELETE_WORD_FAILURE,
				},
				options: {
					urlParams: {
						wordId,
					},
				},
			},
		});
	};
}