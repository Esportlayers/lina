import { combineReducers, createStore, applyMiddleware } from 'redux';
import { HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';
import { createReducer } from './reducer/util/Reducer';
import thunk from 'redux-thunk';
import networkMiddleware from './middleware/NetworkMiddleware';
import { initialUiState, Ui, uiReducer } from './reducer/Ui';

export interface State {
    ui: Ui;
}
const initial: State = {
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
    ui: uiReducer,
});

const makeStore: MakeStore<State> = () => {
    //@ts-ignore
	return createStore(storeReducer, applyMiddleware(thunk, networkMiddleware));
};

export const wrapper = createWrapper<State>(makeStore);
