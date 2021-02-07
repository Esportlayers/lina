import { User } from "@streamdota/shared-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../reducer/Ui";
import { State } from "../Store";

export const currentUserSelector = (state: State): User | null => state.ui.currentUser;
export const loadedVoteSeasonsSelector = (state: State): boolean => state.ui.loadedEntities.voteSeasons; 
export const loadedVoteOverlaySelector = (state: State): boolean => state.ui.loadedEntities.voteOverlay; 
export const loadedDotaOverlaySelector = (state: State): boolean => state.ui.loadedEntities.dotaOverlay; 
export const loadedVoteRoundsSelector = (state: State): number[] => state.ui.loadedEntities.voteRounds;
export const loadedVoteSeasonToplistSelector = (state: State): number[] => state.ui.loadedEntities.voteSeasonToplist;
export const loadedVoteSeasonStatsSelector = (state: State): number[] => state.ui.loadedEntities.voteSeasonStats;
export const loadedBotCommandsSelector = (state: State): boolean => state.ui.loadedEntities.botCommands;
export const loadedGoogleFontsSelector = (state: State): boolean => state.ui.loadedEntities.googleFonts;

export function useCurrentUser(auth?: string): User | null {
	const user = useSelector(currentUserSelector);
	const dispatch = useDispatch();

	useEffect(
        () => {
			if (!user) {
				dispatch(loadCurrentUser(auth));
			}
		},
		[ auth, user ]
	);

	return user;
}
