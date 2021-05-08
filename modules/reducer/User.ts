import {
  AUTH_USER_FAILURE,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_TWITCH_PREDICTIONS_FAILURE,
  AUTH_USER_TWITCH_PREDICTIONS_REQUEST,
  AUTH_USER_TWITCH_PREDICTIONS_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
} from "./Actions";

import { CALL_API } from "../middleware/NetworkMiddlewareTypes";
import { currentUserSelector } from "../selector/UiSelector";
import { loadCurrentUser } from "./Ui";

export function authUser(code: string) {
  return async (dispatch, getState) => {
    if (!currentUserSelector(getState())) {
      const jwt = await dispatch({
        [CALL_API]: {
          endpoint: `${process.env.API_URL}/auth/twitch/callback?code=${code}`,
          headers: { "Content-Type": "text/html" },
          types: {
            requestType: AUTH_USER_REQUEST,
            successType: AUTH_USER_SUCCESS,
            failureType: AUTH_USER_FAILURE,
          },
        },
      });
      localStorage.setItem("jwt", jwt);
      return true;
    }

    return false;
  };
}

export function deleteUser() {
  return async (dispatch, getState) => {
    if (currentUserSelector(getState())) {
      await dispatch({
        [CALL_API]: {
          endpoint: `${process.env.API_URL}/user/deleteAccount`,
          method: "del",
          types: {
            requestType: DELETE_USER_REQUEST,
            successType: DELETE_USER_SUCCESS,
            failureType: DELETE_USER_FAILURE,
          },
        },
      });
      localStorage.removeItem("jwt");
      return true;
    }
    return false;
  };
}

export function accessUserTwitchPredictions(code: string) {
  return async (dispatch) => {
    await dispatch({
      [CALL_API]: {
        endpoint: `${process.env.API_URL}/auth/twitchPredictions/callback?code=${code}`,
        headers: { "Content-Type": "text/html" },
        types: {
          requestType: AUTH_USER_TWITCH_PREDICTIONS_REQUEST,
          successType: AUTH_USER_TWITCH_PREDICTIONS_SUCCESS,
          failureType: AUTH_USER_TWITCH_PREDICTIONS_FAILURE,
        },
      },
    });

    await dispatch(loadCurrentUser());
  };
}

export function testPrediction() {
  return async (dispatch) => {
    await dispatch({
      [CALL_API]: {
        method: "post",
        endpoint: `${process.env.API_URL}/live/twitchPrediction`,
        types: {
          requestType: "TEST_PREDICTION_REQUEST",
          successType: "TEST_PREDICTION_SUCCESS",
          failureType: "TEST_PREDICTION_FAILURE",
        },
      },
    });
  };
}

export function testPredictionResolve(winnerA: boolean) {
  return async (dispatch) => {
    await dispatch({
      [CALL_API]: {
        method: "patch",
        endpoint: `${process.env.API_URL}/live/twitchPrediction`,
        types: {
          requestType: "TEST_PREDICTION_SET_WINNER_REQUEST",
          successType: "TEST_PREDICTION_SET_WINNER_SUCCESS",
          failureType: "TEST_PREDICTION_SET_WINNER_FAILURE",
        },
        options: {
          data: { winnerA },
        },
      },
    });
  };
}
