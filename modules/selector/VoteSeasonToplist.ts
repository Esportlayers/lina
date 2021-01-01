import { State } from '../Store';
import { BetSeasonToplist as VoteSeasonToplist } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedVoteSeasonToplistSelector } from './UiSelector';
import { VoteSeasonToplistState, loadVoteSeasonToplist } from '../reducer/VoteSeasonToplist';

export const voteSeasonToplistEntitiesSelector = (state: State): VoteSeasonToplistState => state.entities.voteSeasonToplist;

export const voteSeasonToplistSelector = (state: State): VoteSeasonToplist[] | undefined =>
	state.entities.voteSeasonToplist ? Object.values(state.entities.voteSeasonToplist) : undefined;

export function useVoteSeasonToplist(seasonId: number, auth?: string): VoteSeasonToplist[] | undefined {
	const toplist = useSelector(voteSeasonToplistSelector);
	const loaded = (useSelector(loadedVoteSeasonToplistSelector) || []).includes(seasonId);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadVoteSeasonToplist(seasonId, auth));
			}
		},
		[ loaded ]
	);

	return (toplist || []).filter(({betSeason}) => betSeason === seasonId);
}