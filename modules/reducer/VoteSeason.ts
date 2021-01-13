import { BetSeason as VoteSeason } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
	LOAD_VOTE_SEASONS_REQUEST,
	LOAD_VOTE_SEASONS_SUCCESS,
	LOAD_VOTE_SEASONS_FAILURE,
	CREATE_VOTE_SEASON_FAILURE,
	CREATE_VOTE_SEASON_SUCCESS,
	CREATE_VOTE_SEASON_REQUEST,
	UPDATE_VOTE_SEASON_REQUEST,
	UPDATE_VOTE_SEASON_SUCCESS,
	UPDATE_VOTE_SEASON_FAILURE,
	DELETE_VOTE_SEASON_REQUEST,
	DELETE_VOTE_SEASON_SUCCESS,
	DELETE_VOTE_SEASON_FAILURE,
} from './Actions';
import { loadCurrentUser } from './Ui';
import { currentUserSelector } from '../selector/UiSelector';

export interface VoteSeasonState {
	[x: number]: VoteSeason;
}

interface DeleteVoteSeason {
	options: {
		urlParams: {
			seasonId: number;
		};
	};
	type: typeof DELETE_VOTE_SEASON_SUCCESS;
}

export const voteSeason = new schema.Entity('voteSeason');

const { addReducer, combinedReducer } = createReducer<VoteSeasonState>();

addReducer<DeleteVoteSeason>(DELETE_VOTE_SEASON_SUCCESS, (state, { options: { urlParams: { seasonId } } }) => {
	const newState = { ...state };
	delete newState[seasonId];
	return newState;
});

export const voteSeasonReducer = combinedReducer;

export function loadVoteSeasons(): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason`,
				schema: [ voteSeason ],
				types: {
					requestType: LOAD_VOTE_SEASONS_REQUEST,
					successType: LOAD_VOTE_SEASONS_SUCCESS,
					failureType: LOAD_VOTE_SEASONS_FAILURE,
				},
			},
		});
	};
}

export function createVoteSeason(data: Partial<VoteSeason>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/1`,
				method: 'post',
				types: {
					requestType: CREATE_VOTE_SEASON_REQUEST,
					successType: CREATE_VOTE_SEASON_SUCCESS,
					failureType: CREATE_VOTE_SEASON_FAILURE,
				},
				options: {
					data,
				},
			},
		});

		await dispatch(loadVoteSeasons());
		await dispatch(loadCurrentUser());
	};
}

export function patchVoteSeason(seasonId: number, data: Partial<VoteSeason>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/:seasonId`,
				method: 'patch',
				types: {
					requestType: UPDATE_VOTE_SEASON_REQUEST,
					successType: UPDATE_VOTE_SEASON_SUCCESS,
					failureType: UPDATE_VOTE_SEASON_FAILURE,
				},
				options: {
					urlParams: {
						seasonId,
					},
					data,
				},
			},
		});

		await dispatch(loadVoteSeasons());
	};
}

export function deleteVoteSeason(seasonId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch, getState) => {
		const currentUser = currentUserSelector(getState());
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/:seasonId`,
				method: 'del',
				types: {
					requestType: DELETE_VOTE_SEASON_REQUEST,
					successType: DELETE_VOTE_SEASON_SUCCESS,
					failureType: DELETE_VOTE_SEASON_FAILURE,
				},
				options: {
					urlParams: {
						seasonId,
					},
				},
			},
		});

		await dispatch(loadVoteSeasons());

		if(currentUser && currentUser.betSeasonId === seasonId) {
			await dispatch(loadCurrentUser());
		}
	};
}
