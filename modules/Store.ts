import { combineReducers, createStore, applyMiddleware } from 'redux';
import { HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';
import { createReducer } from './reducer/util/Reducer';
import thunk from 'redux-thunk';
import networkMiddleware from './middleware/NetworkMiddleware';
import { initialUiState, Ui, uiReducer } from './reducer/Ui';
import LogRocket from 'logrocket';
import { voteRoundReducer, VoteRoundState } from './reducer/VoteRound';
import { voteSeasonReducer, VoteSeasonState } from './reducer/VoteSeason';
import { combiner } from './reducer/util/Combiner';
import { entitiesReducer } from './reducer/util/EntityStates';
import { teamsReducer, TeamsState } from './reducer/Teams';
import { voteSeasonToplistReducer, VoteSeasonToplistState } from './reducer/VoteSeasonToplist';
import { voteOverlayReducer, VoteOverlayState } from './reducer/VoteOverlay';

export interface State {
	entities: {
		teams: TeamsState;
		voteRound: VoteRoundState;
		voteSeason: VoteSeasonState;
		voteSeasonToplist: VoteSeasonToplistState;
		voteOverlay: VoteOverlayState;
    };
    ui: Ui;
}
const initial: State = {
	entities: {
		teams: undefined,
        voteRound: undefined,
		voteSeason: undefined,
		voteSeasonToplist: undefined,
		voteOverlay: undefined,
    },
    ui: initialUiState,
};

const { addReducer, combinedReducer: stateReducer } = createReducer<State>(initial);

interface HydrateAction {
	type: typeof HYDRATE;
	state: State;
}
addReducer<HydrateAction>(HYDRATE, (store) => ({ ...store }));

export const storeReducer = combineReducers<State>({
    ...stateReducer,
	//@ts-ignore
	entities: combiner({
		teams: entitiesReducer(teamsReducer, 'teams'),
		voteRound: entitiesReducer(voteRoundReducer, 'voteRound'),
		voteSeason: entitiesReducer(voteSeasonReducer, 'voteSeason'),
		voteSeasonToplist: entitiesReducer(voteSeasonToplistReducer, 'voteSeasonToplist'),
		voteOverlay: entitiesReducer(voteOverlayReducer, 'voteOverlay'),
    }),
    ui: uiReducer,
});

const makeStore: MakeStore<State> = () => {
    //@ts-ignore
	return createStore(storeReducer, applyMiddleware(thunk, networkMiddleware, LogRocket.reduxMiddleware()));
};

export const wrapper = createWrapper<State>(makeStore);
