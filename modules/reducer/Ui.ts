import { User } from '@streamdota/shared-types';
import {
	LOAD_CURRENT_USER_SUCCESS,
	LOAD_CURRENT_USER_REQUEST,
	LOAD_CURRENT_USER_FAILURE
} from './Actions';
import { ApiActionResponse } from '../middleware/Network';
import { createReducer } from './util/Reducer';
import { ActionDispatcher, CALL_API } from '../middleware/NetworkMiddlewareTypes';
import NetworkError from '../middleware/NetworkError';

export interface Ui {
	currentUser: User | null;
}

export const initialUiState: Ui = {
	currentUser: null,
};

interface CurrentUserSuccess extends ApiActionResponse<User> {
	type: typeof LOAD_CURRENT_USER_SUCCESS;
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
