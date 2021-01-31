import { schema } from "normalizr";
import NetworkError from "../middleware/NetworkError";
import { ActionDispatcher, CALL_API } from "../middleware/NetworkMiddlewareTypes";
import { LOAD_VOTE_SEASON_STATS_REQUEST, LOAD_VOTE_SEASON_STATS_SUCCESS } from "./Actions";
import { createReducer } from "./util/Reducer";

export interface VoteSeasonRoundStats {
    round: number;
    chatters: number;
    participants: number;
}

export interface VoteSeasonStats {
	id: number;
	rounds: number;
	roundsData: VoteSeasonRoundStats[];
    votes: number;
    uniqueVoters: number;
    correct: number;
    wrong: number;
    chatParticipation: {
        avg: number;
        max: number;
        min: number;
    }
}

export interface VoteSeasonStatsState {
	[x: number]: VoteSeasonStats;
}

export const voteSeasonStats = new schema.Entity('voteSeasonStats');

const { combinedReducer } = createReducer<VoteSeasonStatsState>();

export const voteSeasonStatsReducer = combinedReducer;


export function loadVoteSeasonAnalytics(seasonId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betSeason/:seasonId/stats`,
				schema: voteSeasonStats,
				types: {
					requestType: LOAD_VOTE_SEASON_STATS_REQUEST,
					successType: LOAD_VOTE_SEASON_STATS_SUCCESS,
					failureType: LOAD_VOTE_SEASON_STATS_REQUEST,
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