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
import { botCommandReducer, BotCommandState } from './reducer/BotCommands';
import { voteSeasonStatsReducer, VoteSeasonStatsState } from './reducer/VoteSeasonStats';
import { FontState, googleFontReducer } from './reducer/GoogleFont';
import { dotaOverlayReducer, DotaOverlayState } from './reducer/DotaOverlay';
import { dotaStatsReducer, DotaStatsState } from './reducer/DotaStats';
import { antiSnipeOverlayReducer, AntiSnipeOverlayState } from './reducer/AntiSnipeOverlay';
import { roshOverlayReducer, RoshOverlayState } from './reducer/RoshanOverlay';
import { wordReducer, WordState } from './reducer/Word';
import { wordGroupReducer, WordGroupState } from './reducer/WordGroup';

export interface State {
	entities: {
		antiSnipeOverlay: AntiSnipeOverlayState;
		botCommands: BotCommandState;
		dotaOverlay: DotaOverlayState;
		dotaStats: DotaStatsState;
		googleFont: FontState;
		roshOverlay: RoshOverlayState;
		teams: TeamsState;
		voteRound: VoteRoundState;
		voteSeason: VoteSeasonState;
		voteSeasonStats: VoteSeasonStatsState;
		voteSeasonToplist: VoteSeasonToplistState;
		voteOverlay: VoteOverlayState;
		word: WordState;
		wordGroup: WordGroupState;
    };
    ui: Ui;
}
const initial: State = {
	entities: {
		antiSnipeOverlay: undefined,
		botCommands: undefined,
		dotaOverlay: undefined,
		dotaStats: undefined,
		googleFont: undefined,
		roshOverlay: undefined,
		teams: undefined,
        voteRound: undefined,
		voteSeason: undefined,
		voteSeasonStats: undefined,
		voteSeasonToplist: undefined,
		voteOverlay: undefined,
		word: undefined,
		wordGroup: undefined,
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
		antiSnipeOverlay: entitiesReducer(antiSnipeOverlayReducer, 'antiSnipeOverlay'),
		botCommands: entitiesReducer(botCommandReducer, 'botCommands'),
		dotaOverlay: entitiesReducer(dotaOverlayReducer, 'dotaOverlay'),
		dotaStats: entitiesReducer(dotaStatsReducer, 'dotaStats'),
		googleFont: entitiesReducer(googleFontReducer, 'googleFont'),
		roshOverlay: entitiesReducer(roshOverlayReducer, 'roshOverlay'),
		teams: entitiesReducer(teamsReducer, 'teams'),
		voteRound: entitiesReducer(voteRoundReducer, 'voteRound'),
		voteSeason: entitiesReducer(voteSeasonReducer, 'voteSeason'),
		voteSeasonStats: entitiesReducer(voteSeasonStatsReducer, 'voteSeasonStats'),
		voteSeasonToplist: entitiesReducer(voteSeasonToplistReducer, 'voteSeasonToplist'),
		voteOverlay: entitiesReducer(voteOverlayReducer, 'voteOverlay'),
		word: entitiesReducer(wordReducer, 'word'),
		wordGroup: entitiesReducer(wordGroupReducer, 'wordGroup'),
    }),
    ui: uiReducer,
});

const makeStore: MakeStore<State> = () => {
    //@ts-ignore
	return createStore(storeReducer, applyMiddleware(thunk, networkMiddleware, LogRocket.reduxMiddleware()));
};

export const wrapper = createWrapper<State>(makeStore);
