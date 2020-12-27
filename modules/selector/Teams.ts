import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMatchTeams, MatchTeams, TeamsState } from "../reducer/Teams";
import { State } from "../Store";

export const teamsSelector = (state: State): TeamsState | null => state.entities.teams;

export function useMatchTeams(matchId: number): MatchTeams | undefined {
    const teams = useSelector(teamsSelector);
    const team = teams && teams[matchId];
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!team) {
				dispatch(loadMatchTeams(matchId));
			}
		},
		[ teams, matchId ]
	);

	return team;
}