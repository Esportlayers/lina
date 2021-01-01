import { CALL_API, ActionDispatcher } from "../middleware/NetworkMiddlewareTypes";
import NetworkError from "../middleware/NetworkError";
import { schema } from "normalizr";
import { createReducer } from "./util/Reducer";
import { BetOverlay } from "@streamdota/shared-types";
import { 
    LOAD_VOTE_OVERLAY_FAILURE,
    LOAD_VOTE_OVERLAY_REQUEST, 
    LOAD_VOTE_OVERLAY_SUCCESS, 
    UPDATE_VOTE_OVERLAY_FAILURE, 
    UPDATE_VOTE_OVERLAY_REQUEST, 
    UPDATE_VOTE_OVERLAY_SUCCESS,
} from "./Actions";

export type VoteOverlayState = BetOverlay;
export const voteOverlay = new schema.Entity('voteOverlay');

interface VoteOverlayLoaded {
	type: typeof LOAD_VOTE_OVERLAY_SUCCESS;
	response: VoteOverlayState;
}

const { addReducer, combinedReducer } = createReducer<VoteOverlayState>();

addReducer<VoteOverlayLoaded>(LOAD_VOTE_OVERLAY_SUCCESS, (_state, {response}) => {
	return response;
});

export const voteOverlayReducer = combinedReducer;

export function loadVoteOverlay(frameApiKey?: string): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		const endpoint = frameApiKey ? `${process.env.API_URL}/betsOverlay?frameApiKey=${frameApiKey}` : `${process.env.API_URL}/betsOverlay`;
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
                endpoint,
				types: {
					requestType: LOAD_VOTE_OVERLAY_REQUEST,
					successType: LOAD_VOTE_OVERLAY_SUCCESS,
					failureType: LOAD_VOTE_OVERLAY_FAILURE,
                },
			},
		});
	};
}

export function patchVoteOverlay(data: Partial<BetOverlay>): ActionDispatcher<Promise<void>> {
	return async (dispatch) => {
		await dispatch<Promise<Response | NetworkError>>({
			[CALL_API]: {
				endpoint: `${process.env.API_URL}/betsOverlay`,
				method: 'patch',
				types: {
					requestType: UPDATE_VOTE_OVERLAY_REQUEST,
					successType: UPDATE_VOTE_OVERLAY_SUCCESS,
					failureType: UPDATE_VOTE_OVERLAY_FAILURE,
				},
				options: {
					data,
				}
			},
		});
	};
}