import * as Sentry from "@sentry/react";

import { useDispatch, useSelector } from "react-redux";

import { State } from "../Store";
import { User } from "@streamdota/shared-types";
import { loadCurrentUser } from "../reducer/Ui";
import { useEffect } from "react";

export const currentUserSelector = (state: State): User | null =>
  state.ui.currentUser;
export const loadedVoteSeasonsSelector = (state: State): boolean =>
  state.ui.loadedEntities.voteSeasons;
export const loadedVoteOverlaySelector = (state: State): boolean =>
  state.ui.loadedEntities.voteOverlay;
export const loadedDotaOverlaySelector = (state: State): boolean =>
  state.ui.loadedEntities.dotaOverlay;
export const loadedVoteRoundsSelector = (state: State): number[] =>
  state.ui.loadedEntities.voteRounds;
export const loadedVoteSeasonToplistSelector = (state: State): number[] =>
  state.ui.loadedEntities.voteSeasonToplist;
export const loadedVoteSeasonStatsSelector = (state: State): number[] =>
  state.ui.loadedEntities.voteSeasonStats;
export const loadedBotCommandsSelector = (state: State): boolean =>
  state.ui.loadedEntities.botCommands;
export const loadedGoogleFontsSelector = (state: State): boolean =>
  state.ui.loadedEntities.googleFonts;
export const loadedWordGroupsSelector = (state: State): boolean =>
  state.ui.loadedEntities.wordGroups;
export const loadedWordGroupAnalysesSelector = (state: State): number[] =>
  state.ui.loadedEntities.wordGroupAnalyses;

export function useCurrentUser(auth?: string): User | null {
  const user = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loadCurrentUser(auth));
    } else if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production" &&
      process.env.SENTRY_DSN &&
      process.env.SENTRY_DSN.length > 0
    ) {
      Sentry.setUser({
        id: `${user.id}`,
        username: user.displayName,
        twitchId: user.twitchId,
      });
    }
  }, [auth, user]);

  return user;
}
