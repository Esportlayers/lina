import { State } from '../Store';
import { BetSeason as VoteSeason } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadedVoteSeasonsSelector } from './UiSelector';
import { loadVoteSeasons, VoteSeasonState } from '../reducer/VoteSeason';
import isEmpty from 'lodash/isEmpty';

export const voteSeasonEntitiesSelector = (state: State): VoteSeasonState => state.entities.voteSeason;

export const voteSeasonsSelector = (state: State): VoteSeason[] | undefined =>
	!isEmpty(state.entities.voteSeason) ? Object.values(state.entities.voteSeason) : undefined;

export function useVoteSeasons(): VoteSeason[] | undefined {
	const seasons = useSelector(voteSeasonsSelector);
	const loaded = useSelector(loadedVoteSeasonsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadVoteSeasons());
			}
		},
		[ loaded ]
	);

	return seasons;
}