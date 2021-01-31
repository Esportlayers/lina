import { State } from '../Store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadVoteSeasonAnalytics, VoteSeasonStats, VoteSeasonStatsState } from '../reducer/VoteSeasonStats';
import { loadedVoteSeasonStatsSelector } from './UiSelector';

export const voteSeasonStatsEntitiesSelector = (state: State): VoteSeasonStatsState => state.entities.voteSeasonStats;

export function useVoteSeasonStats(seasonId?: number): VoteSeasonStats | undefined {
	const stats = useSelector(voteSeasonStatsEntitiesSelector);
	const loaded = (useSelector(loadedVoteSeasonStatsSelector) || []).includes(seasonId);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded && seasonId) {
				dispatch(loadVoteSeasonAnalytics(seasonId));
			}
		},
		[ loaded, seasonId ]
	);

	return stats ? stats[seasonId] : undefined;
}