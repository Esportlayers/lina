import { CALL_API } from "../middleware/NetworkMiddlewareTypes";
import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from "./Actions";
import { currentUserSelector } from "../selector/UiSelector";

export function authUser(code: string) {
    return async (dispatch, getState) => {
        if(!currentUserSelector(getState())) {
            const jwt = await dispatch({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/auth/twitch/callback?code=${code}`,
                    headers: { 'Content-Type': 'text/html' },
                    types: {
                        requestType: AUTH_USER_REQUEST,
                        successType: AUTH_USER_SUCCESS,
                        failureType: AUTH_USER_FAILURE,
                    },
                },
            });
            localStorage.setItem('jwt', jwt);
            return true;
        }

        return false;
    }
}

export function deleteUser() {
    return async (dispatch, getState) => {
        if(currentUserSelector(getState())) {
            await dispatch({
                [CALL_API]: {
                    endpoint: `${process.env.API_URL}/user/deleteAccount`,
                    method: 'del',
                    types: {
                        requestType: DELETE_USER_REQUEST,
                        successType: DELETE_USER_SUCCESS,
                        failureType: DELETE_USER_FAILURE,
                    },
                },
            });
            localStorage.removeItem('jwt');
            return true;
        }
        return false;
    }
}