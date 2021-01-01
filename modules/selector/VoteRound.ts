import { State } from '../Store';
import { BetRound as VoteRound, BetRoundStats as VoteRoundStats } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { VoteRoundData } from '@esportlayers/io';
import { loadCurrentVoteRound, loadVoteRounds, VoteRoundState } from '../reducer/VoteRound';
import { loadedVoteRoundsSelector } from './UiSelector';

export const voteRoundEntitiesSelector = (state: State): VoteRoundState => state.entities.voteRound;

export const voteRoundsSelector = (state: State): VoteRoundStats[] | undefined =>
	state.entities.voteRound ? Object.values(state.entities.voteRound) : undefined;

export function useVoteRounds(seasonId: number): VoteRoundStats[] | undefined {
	const rounds = useSelector(voteRoundsSelector);
	const loaded = (useSelector(loadedVoteRoundsSelector) || []).includes(seasonId);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadVoteRounds(seasonId));
			}
		},
		[ loaded ]
	);

	return rounds.filter(({betSeason}) => betSeason === seasonId);
}

export const currentVoteRoundSelector = (state: State): VoteRoundData | null => state.ui.currentVoteRound;

export function useCurrentVoteRound(auth?: string): VoteRoundData | null {
	const currentVoteRound = useSelector(currentVoteRoundSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (currentVoteRound === null) {
				dispatch(loadCurrentVoteRound(auth));
			}
		},
		[ auth, currentVoteRound ]
	);

	return currentVoteRound || null;
}