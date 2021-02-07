import { OverlayConfig, DotaStats } from '@streamdota/shared-types';
import { State } from '../Store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadDotaOverlay } from '../reducer/DotaOverlay';
import { loadedDotaOverlaySelector } from './UiSelector';

export const dotaOverlaySelector = (state: State): OverlayConfig | undefined => state.entities.dotaOverlay;

export function useDotaOverlay(frameApiKey?: string): OverlayConfig | undefined {
	const overlay = useSelector(dotaOverlaySelector);
    const loaded = useSelector(loadedDotaOverlaySelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadDotaOverlay(frameApiKey));
			}
		},
		[ loaded, frameApiKey ]
	);

	return overlay;
}
