import { combineReducers, createStore, applyMiddleware } from 'redux';
import { HYDRATE, MakeStore, createWrapper } from 'next-redux-wrapper';
import { createReducer } from './reducer/util/Reducer';
import { combiner } from './reducer/util/Combiner';
import thunk from 'redux-thunk';
import networkMiddleware from './middleware/NetworkMiddleware';

export interface State {
	entities: {
	};
}
const initial: State = {
	entities: {
	},
};

const { addReducer, combinedReducer: stateReducer } = createReducer<State>(initial);

interface HydrateAction {
	type: typeof HYDRATE;
	state: State;
}
addReducer<HydrateAction>(HYDRATE, (store) => ({ ...store }));

export const storeReducer = combineReducers<State>({
	...stateReducer,
	entities: combiner({
	})
});

const makeStore: MakeStore<State> = () => {
    //@ts-ignore
	return createStore(storeReducer, applyMiddleware(thunk, networkMiddleware));
};

export const wrapper = createWrapper<State>(makeStore);
