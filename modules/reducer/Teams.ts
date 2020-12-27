import { createReducer } from './util/Reducer';
import { schema } from 'normalizr';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';
import {
    LOAD_MATCH_TEAMS_FAILURE,
    LOAD_MATCH_TEAMS_SUCCESS,
    LOAD_MATCH_TEAMS_REQUEST,
} from './Actions';

interface Team {
    name: string;
    logo: string;
}

export interface MatchTeams {
    radiant: Team;
    dire: Team;
}

export interface TeamsState {
	[x: string]: MatchTeams;
}

export const teams = new schema.Entity('teams');

const { combinedReducer } = createReducer<TeamsState>();

export const teamsReducer = combinedReducer;

export function loadMatchTeams(matchId: number): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/live/teams/:matchId`,
				schema: teams,
				types: {
					requestType: LOAD_MATCH_TEAMS_REQUEST,
					successType: LOAD_MATCH_TEAMS_SUCCESS,
					failureType: LOAD_MATCH_TEAMS_FAILURE,
                },
                options: {
                    urlParams: {
                        matchId,
                    },
                },
			},
		});
	};
}