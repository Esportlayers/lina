import { Word, WordMessage } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { LOAD_WORD_GROUP_ANALYSES_FAILURE, LOAD_WORD_GROUP_ANALYSES_REQUEST, LOAD_WORD_GROUP_ANALYSES_SUCCESS } from './Actions';

export interface WordStats extends Word {
	messages: WordMessage[];
}
export interface WordGroupAnalysesState {
	[x: number]: WordStats[];
}

export const wordGroupAnalyses = new schema.Entity('wordGroupAnalyses');

const { combinedReducer } = createReducer<WordGroupAnalysesState>();

export const wordGroupAnalysesReducer = combinedReducer;

export function loadWordGroupAnalyses(wordGroupId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/chatKeywords/wordGroupAnalyses/:wordGroupId`,
				schema: [ wordGroupAnalyses ],
				types: {
					requestType: LOAD_WORD_GROUP_ANALYSES_REQUEST,
					successType: LOAD_WORD_GROUP_ANALYSES_SUCCESS,
					failureType: LOAD_WORD_GROUP_ANALYSES_FAILURE,
                },
				options: {
					urlParams: {
						wordGroupId
					}
				}
			},
		});
	};
}
