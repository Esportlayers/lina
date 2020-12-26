import { BetRound as VoteRound } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
    DELETE_VOTE_ROUND_SUCCESS,
    LOAD_VOTE_ROUNDS_REQUEST,
    LOAD_VOTE_ROUNDS_SUCCESS,
    LOAD_VOTE_ROUNDS_FAILURE,
    CREATE_VOTE_ROUND_REQUEST,
    CREATE_VOTE_ROUND_SUCCESS,
    CREATE_VOTE_ROUND_FAILURE,
    UPDATE_VOTE_ROUND_REQUEST,
    UPDATE_VOTE_ROUND_SUCCESS,
    UPDATE_VOTE_ROUND_FAILURE,
    DELETE_VOTE_ROUND_REQUEST,
    DELETE_VOTE_ROUND_FAILURE,
	LOAD_CURRENT_VOTE_ROUND_REQUEST,
	LOAD_CURRENT_VOTE_ROUND_SUCCESS,
	LOAD_CURRENT_VOTE_ROUND_FAILURE,
} from './Actions';

export interface VoteRoundState {
	[x: number]: VoteRound;
}

interface DeleteVoteRound {
	options: {
		urlParams: {
			voteRoundId: number;
		};
	};
	type: typeof DELETE_VOTE_ROUND_SUCCESS;
}

export const voteRound = new schema.Entity('voteRound');

const { addReducer, combinedReducer } = createReducer<VoteRoundState>();

addReducer<DeleteVoteRound>(DELETE_VOTE_ROUND_SUCCESS, (state, { options: { urlParams: { voteRoundId } } }) => {
	const newState = { ...state };
	delete newState[voteRoundId];
	return newState;
});

export const voteRoundReducer = combinedReducer;

export function loadVoteRounds(seasonId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/rounds/:seasonId`,
				schema: [ voteRound ],
				types: {
					requestType: LOAD_VOTE_ROUNDS_REQUEST,
					successType: LOAD_VOTE_ROUNDS_SUCCESS,
					failureType: LOAD_VOTE_ROUNDS_FAILURE,
                },
                options: {
                    urlParams: {
                        seasonId,
                    },
                },
			},
		});
	};
}

export function createVoteRound(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/bets`,
				method: 'post',
				types: {
					requestType: CREATE_VOTE_ROUND_REQUEST,
					successType: CREATE_VOTE_ROUND_SUCCESS,
					failureType: CREATE_VOTE_ROUND_FAILURE,
				},
			},
		});
	};
}

export function updateVoteRound(betRoundId: number, data: Partial<VoteRound>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/bets/:betRoundId`,
				method: 'patch',
				types: {
					requestType: UPDATE_VOTE_ROUND_REQUEST,
					successType: UPDATE_VOTE_ROUND_SUCCESS,
					failureType: UPDATE_VOTE_ROUND_FAILURE,
				},
				options: {
					urlParams: {
						betRoundId,
					},
					data,
				},
			},
		});
	};
}

export function deleteVoteRound(voteRoundId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/bets/:voteRoundId`,
				method: 'del',
				types: {
					requestType: DELETE_VOTE_ROUND_REQUEST,
					successType: DELETE_VOTE_ROUND_SUCCESS,
					failureType: DELETE_VOTE_ROUND_FAILURE,
				},
				options: {
					urlParams: {
						voteRoundId,
					},
				},
			},
		});
	};
}

export function loadCurrentVoteRound(frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/bets/current?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/bets/current`;
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint,
				types: {
					requestType: LOAD_CURRENT_VOTE_ROUND_REQUEST,
					successType: LOAD_CURRENT_VOTE_ROUND_SUCCESS,
					failureType: LOAD_CURRENT_VOTE_ROUND_FAILURE,
                },
			},
		});
	};
}