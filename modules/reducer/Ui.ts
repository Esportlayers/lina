import { User } from '@streamdota/shared-types';
import {
	LOAD_CURRENT_USER_SUCCESS,
	LOAD_CURRENT_USER_REQUEST,
	LOAD_CURRENT_USER_FAILURE,
	LOAD_CURRENT_VOTE_ROUND_SUCCESS,
	LOAD_VOTE_SEASONS_SUCCESS,
	UPDATE_CURRENT_USER_REQUEST,
	UPDATE_CURRENT_USER_SUCCESS,
	UPDATE_CURRENT_USER_FAILURE,
	LOAD_VOTE_SEASON_TOPLIST_SUCCESS,
	LOAD_VOTE_OVERLAY_SUCCESS,
	LOAD_COMMANDS_SUCCESS,
	LOAD_VOTE_SEASON_STATS_SUCCESS
} from './Actions';
import { ApiActionResponse } from '../middleware/Network';
import { createReducer } from './util/Reducer';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import { VoteRoundData } from '@esportlayers/io';
import { currentUserSelector } from '../selector/UiSelector';

export interface Ui {
	currentUser: User | null;
	currentVoteRound: VoteRoundData | null;
	loadedEntities: {
		botCommands: boolean;
		voteRounds: number[];
		voteSeasons: boolean;
		voteSeasonStats: number[];
		voteSeasonToplist: number[];
		voteOverlay: boolean;
	};
}

export const initialUiState: Ui = {
	currentUser: null,
	currentVoteRound: null,
	loadedEntities: {
		botCommands: false,
		voteRounds: [],
		voteSeasons: false,
		voteSeasonStats: [],
		voteSeasonToplist: [],
		voteOverlay: false,
	},
};

interface CurrentUserSuccess extends ApiActionResponse<User> {
	type: typeof LOAD_CURRENT_USER_SUCCESS;
}

interface EntityLoaded<T> {
	type: T;
}

interface VoteRoundUpdateSuccess {
	type: typeof LOAD_CURRENT_VOTE_ROUND_SUCCESS;
	response: VoteRoundData;
}

const { addReducer, combinedReducer } = createReducer<Ui>(initialUiState);

addReducer<CurrentUserSuccess>(LOAD_CURRENT_USER_SUCCESS, (state, { response: currentUser }) => {
	return {
		...state,
		currentUser: {
			...currentUser,
			gsiConnected: Boolean(currentUser.gsiConnected),
			useBets: Boolean(currentUser.useBets),
		},
	};
});

addReducer<VoteRoundUpdateSuccess>(LOAD_CURRENT_VOTE_ROUND_SUCCESS, (state, { response: voteRound }) => {
	return {
		...state,
		currentVoteRound: voteRound,
	};
});

const flatLoadedEntities = [
	['botCommands', LOAD_COMMANDS_SUCCESS, true],
	['voteSeasons', LOAD_VOTE_SEASONS_SUCCESS, true],
	['voteOverlay', LOAD_VOTE_OVERLAY_SUCCESS, true],
];

for(const [key, listener, loaded] of flatLoadedEntities) {
	addReducer<EntityLoaded<typeof listener>>(listener, (state) => {
		return {
			...state,
			loadedEntities: {
				...state.loadedEntities,
				//@ts-ignore
				[key]: loaded,
			},
		};
	});
}

interface LoadedVoteSeasonAsset<T> {
	type: T;
	options: {
		urlParams: {
			seasonId: number;
		};
	};
}


const voteSeasonAssetsLoaded  = [
	['voteSeasonToplist', LOAD_VOTE_SEASON_TOPLIST_SUCCESS],
	['voteSeasonStats', LOAD_VOTE_SEASON_STATS_SUCCESS],
];

for(const [key, listener] of voteSeasonAssetsLoaded) {
	addReducer<LoadedVoteSeasonAsset<typeof listener>>(listener, (state, {options: {urlParams: {seasonId}}}) => {
		return {
			...state,
			loadedEntities: {
				...state.loadedEntities,
				[key]: state.loadedEntities[key].concat(seasonId),
			},
		};
	});
}

export const uiReducer = combinedReducer;

export function loadCurrentUser(frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/user/baseData?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/user/baseData`;
		const response = await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint,
				types: {
					requestType: LOAD_CURRENT_USER_REQUEST,
					successType: LOAD_CURRENT_USER_SUCCESS,
					failureType: LOAD_CURRENT_USER_FAILURE,
				},
			},
		});

		if (!response || (response as NetworkError).responseStatus === 401) {
			location.href = `${process.env.API_URL}/auth/twitch`;
		}
	};
}


export function updateCurrentUser(data: Partial<User>): ActionDispatcher<Promise<void>> {
	return async (dispatch, getState) => {
		if (currentUserSelector(getState())) {
			await dispatch<Promise<Response | NetworkError>>({
				[CALL_API]: {
					endpoint: `${process.env.API_URL}/user/baseData`,
					method: 'patch',
					types: {
						requestType: UPDATE_CURRENT_USER_REQUEST,
						successType: UPDATE_CURRENT_USER_SUCCESS,
						failureType: UPDATE_CURRENT_USER_FAILURE,
					},
					options: {
						data,
					},
				},
			});

			await dispatch(loadCurrentUser());
		}
	};
}