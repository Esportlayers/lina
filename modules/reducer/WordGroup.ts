import { WordGroup } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { CREATE_WORD_GROUP_FAILURE, CREATE_WORD_GROUP_REQUEST, CREATE_WORD_GROUP_SUCCESS, DELETE_WORD_GROUP_FAILURE, DELETE_WORD_GROUP_REQUEST, DELETE_WORD_GROUP_SUCCESS, LOAD_WORD_GROUPS_FAILURE, LOAD_WORD_GROUPS_REQUEST, LOAD_WORD_GROUPS_SUCCESS, UPDATE_WORD_GROUP_FAILURE, UPDATE_WORD_GROUP_REQUEST, UPDATE_WORD_GROUP_SUCCESS } from './Actions';
import { word } from './Word';

export interface WordGroupState {
	[x: number]: WordGroup;
}

interface DeleteWordGroup {
	options: {
		urlParams: {
			wordGroupId: number;
		};
	};
	type: typeof DELETE_WORD_GROUP_SUCCESS;
}

export const wordGroup = new schema.Entity(
    'wordGroup',
	{
		words: [ word ],
	},
	{
		processStrategy: (wordGroup: WordGroup) => ({
			...wordGroup,
			active: Boolean(wordGroup.active),
		}),
	}
);

const { addReducer, combinedReducer } = createReducer<WordGroupState>();

addReducer<DeleteWordGroup>(DELETE_WORD_GROUP_SUCCESS, (state, { options: { urlParams: { wordGroupId } } }) => {
	const newState = { ...state };
	delete newState[wordGroupId];
	return newState;
});

export const wordGroupReducer = combinedReducer;

export function loadWordGroups(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/wordGroups`,
				schema: [ wordGroup ],
				types: {
					requestType: LOAD_WORD_GROUPS_REQUEST,
					successType: LOAD_WORD_GROUPS_SUCCESS,
					failureType: LOAD_WORD_GROUPS_FAILURE,
                },
			},
		});
	};
}

export function createWordGroup(name: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/wordGroup`,
				method: 'post',
				types: {
					requestType: CREATE_WORD_GROUP_REQUEST,
					successType: CREATE_WORD_GROUP_SUCCESS,
					failureType: CREATE_WORD_GROUP_FAILURE,
				},
                options: {
                    data: {
                        name,
                    }
                }
			},
		});
		await dispatch(loadWordGroups());
	};
}

export function updateWordGroup(wordGroupId: number, data: Partial<WordGroup>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/wordGroup/:wordGroupId`,
				method: 'patch',
				types: {
					requestType: UPDATE_WORD_GROUP_REQUEST,
					successType: UPDATE_WORD_GROUP_SUCCESS,
					failureType: UPDATE_WORD_GROUP_FAILURE,
				},
				options: {
					urlParams: {
						wordGroupId,
					},
					data,
				},
			},
		});
	};
}

export function deleteWordGroup(wordGroupId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/wordGroup/:wordGroupId`,
				method: 'del',
				types: {
					requestType: DELETE_WORD_GROUP_REQUEST,
					successType: DELETE_WORD_GROUP_SUCCESS,
					failureType: DELETE_WORD_GROUP_FAILURE,
				},
				options: {
					urlParams: {
						wordGroupId,
					},
				},
			},
		});
	};
}