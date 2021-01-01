
import { VoteOverlayState, loadVoteOverlay } from "../reducer/VoteOverlay";
import { State } from "../Store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadedVoteOverlaySelector } from "./UiSelector";

export const voteOverlaySelector = (state: State): VoteOverlayState | null => state.entities.voteOverlay;

export function useVoteOverlay(auth?: string): VoteOverlayState | null {
    const voteOverlay = useSelector(voteOverlaySelector);
    const loaded = useSelector(loadedVoteOverlaySelector);
    const dispatch = useDispatch();

	useEffect(
		() => {
			if (!loaded) {
				dispatch(loadVoteOverlay(auth));
			}
		},
		[ auth, loaded,  voteOverlay ]
	);

	return voteOverlay;
}