import { State } from '../Store';
import { Command } from '@streamdota/shared-types';
import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUserCommands } from '../reducer/BotCommands';
import { loadedBotCommandsSelector } from './UiSelector';

export const commandEntitiesSelector = (state: State): { [x: number]: Command } => state.entities.botCommands;

export const commandsSelector = (state: State): Command[] | undefined =>
	state.entities.botCommands ? Object.values(state.entities.botCommands) : undefined;

export const commandsByTypeSelector = createSelector(commandsSelector, (commands) =>
	memoize((selType: Command['type']) => (commands ? commands.filter(({ type }) => type === selType) : undefined))
);

export function useUserCommands(type: Command['type']): Command[] | undefined {
	const commands = useSelector(commandsByTypeSelector)(type);
	const loaded = useSelector(loadedBotCommandsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadUserCommands());
			}
		},
		[ loaded ]
	);

	return commands;
}

export function useCommandByIdentifier(identifier: Command['identifier']): Command | undefined {
	const commands = useSelector(commandsSelector);
	const loaded = useSelector(loadedBotCommandsSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadUserCommands());
			}
		},
		[ loaded ]
	);

	return commands.find(({ identifier: cIdentifier }) => cIdentifier === identifier);
}