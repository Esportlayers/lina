import { BetSeasonToplist as VoteSeasonToplist } from '@streamdota/shared-types';
import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
    LOAD_VOTE_SEASON_TOPLIST_REQUEST,
    LOAD_VOTE_SEASON_TOPLIST_SUCCESS,
    LOAD_VOTE_SEASON_TOPLIST_FAILURE,
} from './Actions';

export interface VoteSeasonToplistState {
	[x: number]: VoteSeasonToplist;
}

export const voteSeasonToplist = new schema.Entity('voteSeasonToplist', {}, {
	idAttribute: (item) => item.betSeason + '-' + item.id
});
const { combinedReducer } = createReducer<VoteSeasonToplistState>();

export const voteSeasonToplistReducer = combinedReducer;

export function loadVoteSeasonToplist(seasonId: number, frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/betSeason/toplist/:seasonId?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/betSeason/toplist/:seasonId`;
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint,
				schema: [ voteSeasonToplist ],
				types: {
					requestType: LOAD_VOTE_SEASON_TOPLIST_REQUEST,
					successType: LOAD_VOTE_SEASON_TOPLIST_SUCCESS,
					failureType: LOAD_VOTE_SEASON_TOPLIST_FAILURE,
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